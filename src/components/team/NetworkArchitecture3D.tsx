"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NetworkArchitecture3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background

    const scene = new THREE.Scene();
    const root = new THREE.Group();
    scene.add(root);

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    const FRUST = 7.4;

    function setCam() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      renderer.setSize(w, h);
      const aspect = w / h;
      camera.left = -FRUST * aspect;
      camera.right = FRUST * aspect;
      camera.top = FRUST;
      camera.bottom = -FRUST;
      camera.updateProjectionMatrix();
    }
    setCam();

    const onResize = () => setCam();
    window.addEventListener("resize", onResize);

    const WHITE = 0xffffff;

    // Material helpers
    function lineMat(opacity = 1) {
      return new THREE.LineBasicMaterial({
        color: WHITE,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
    }

    function dottedMat(opacity = 1, dash = 0.07, gap = 0.11) {
      return new THREE.LineDashedMaterial({
        color: WHITE,
        transparent: true,
        opacity,
        dashSize: dash,
        gapSize: gap,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
    }

    // Cube edges
    function cubeEdges(s: number): [number, number, number][][] {
      const h = s / 2;
      const v: [number, number, number][] = [
        [-h, -h, -h], [h, -h, -h], [h, -h, h], [-h, -h, h], // bottom
        [-h, h, -h], [h, h, -h], [h, h, h], [-h, h, h], // top
      ];
      const e = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom loop
        [4, 5], [5, 6], [6, 7], [7, 4], // top loop
        [0, 4], [1, 5], [2, 6], [3, 7], // vertical pillars
      ];
      return e.map(([a, b]) => [v[a], v[b]]);
    }

    // Wire cube builder
    function makeWireCube(size: number, { dotted = false, opacity = 1 } = {}) {
      const g = new THREE.Group();
      const edges = cubeEdges(size);
      const segs: THREE.Line[] = [];
      for (const [a, b] of edges) {
        const pa = new THREE.Vector3(...a);
        const pb = new THREE.Vector3(...b);
        const geo = new THREE.BufferGeometry().setFromPoints([pa.clone(), pa.clone()]);
        const mat = dotted ? dottedMat(opacity) : lineMat(opacity);
        const line = new THREE.Line(geo, mat);
        if (dotted) line.computeLineDistances();
        line.userData = { pa, pb, dotted };
        g.add(line);
        segs.push(line);
      }
      g.userData.segs = segs;
      return g;
    }

    // Progress drawer for wireframe cubes
    function drawCube(group: THREE.Group, p: number) {
      const segs = group.userData.segs as THREE.Line[];
      if (!segs) return;
      const n = segs.length;
      for (let i = 0; i < n; i++) {
        const t0 = i / n;
        const t1 = (i + 1) / n;
        let local = (p - t0) / (t1 - t0);
        local = Math.max(0, Math.min(1, local));
        const { pa, pb, dotted } = segs[i].userData;
        const cur = pa.clone().lerp(pb, local);
        segs[i].geometry.setFromPoints([pa, cur]);
        if (dotted) segs[i].computeLineDistances();
        segs[i].visible = local > 0;
      }
    }

    // Server cube setup
    function makeServerCube(size: number, { dotted = false } = {}) {
      const g = new THREE.Group();
      const cube = makeWireCube(size, { dotted });
      g.add(cube);

      const detail = new THREE.Group();
      const h = size / 2;
      const mk = () => (dotted ? dottedMat(1) : lineMat(1));

      const slots = new THREE.Group();
      const inset = size * 0.1;
      const xL = -h + inset;
      const xR = h - inset - size * 0.18;
      const nSlots = 3;
      const yTop = h * 0.36;
      const slotGap = size * 0.17;
      const slotH = size * 0.075;

      for (let i = 0; i < nSlots; i++) {
        const y = yTop - i * slotGap;
        const z = h + 0.001;
        const pts = [
          new THREE.Vector3(xL, y, z),
          new THREE.Vector3(xR, y, z),
          new THREE.Vector3(xR, y - slotH, z),
          new THREE.Vector3(xL, y - slotH, z),
          new THREE.Vector3(xL, y, z),
        ];
        const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mk());
        if (dotted) ln.computeLineDistances();
        slots.add(ln);

        const inner = [
          new THREE.Vector3(xL + size * 0.03, y - slotH * 0.5, z),
          new THREE.Vector3(xR - size * 0.03, y - slotH * 0.5, z),
        ];
        const il = new THREE.Line(new THREE.BufferGeometry().setFromPoints(inner), mk());
        if (dotted) il.computeLineDistances();
        slots.add(il);
      }

      const dotMat = new THREE.MeshBasicMaterial({ color: WHITE });
      const dotGeo = new THREE.SphereGeometry(size * 0.026, 10, 10);
      for (let i = 0; i < 2; i++) {
        const d = new THREE.Mesh(dotGeo, dotMat);
        d.position.set(h - inset - size * 0.05, yTop - i * slotGap * 1.4 - slotH * 0.5, h + size * 0.01);
        slots.add(d);
      }

      detail.add(slots);
      g.add(detail);
      g.userData.cube = cube;
      g.userData.detail = detail;
      return g;
    }

    // Glow sprite texture
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.25, "rgba(255,255,255,0.9)");
      grd.addColorStop(0.5, "rgba(255,255,255,0.35)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    function glowNode(scale: number) {
      const m = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      m.scale.set(scale, scale, 1);
      return m;
    }

    // Layout values
    const CENTER_SIZE = 2.2;
    const SERVER_SIZE = 2.0;
    const DEPTH_SIZE = 4.6;

    // Central cube
    const center = makeWireCube(CENTER_SIZE);
    root.add(center);

    // Depth background cube
    const depthCube = makeWireCube(DEPTH_SIZE, { dotted: true, opacity: 0.5 });
    root.add(depthCube);

    // Core data nodes
    const innerNodes: THREE.Sprite[] = [];
    const innerPos = [
      new THREE.Vector3(0.0, 0.35, 0.0),
      new THREE.Vector3(-0.45, -0.4, 0.3),
      new THREE.Vector3(0.5, -0.35, -0.1),
    ];
    for (const p of innerPos) {
      const node = glowNode(0.9);
      node.position.copy(p);
      node.material.opacity = 0;
      root.add(node);
      innerNodes.push(node);
    }

    // Camera basis vectors for screen plane projections
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    const camRight = new THREE.Vector3().crossVectors(camDir, camera.up).normalize();
    const camUp = new THREE.Vector3().crossVectors(camRight, camDir).normalize();

    function screenDir(sx: number, sy: number) {
      return camRight.clone().multiplyScalar(sx).add(camUp.clone().multiplyScalar(sy)).normalize();
    }

    const RH = 6.2;
    const RV = 5.4;
    const layout = [
      { key: "top", dir: screenDir(0, 1), dist: RV, dotted: false },
      { key: "bottom", dir: screenDir(0, -1), dist: RV, dotted: false },
      { key: "ul", dir: screenDir(-0.92, 0.55), dist: RH, dotted: true },
      { key: "ur", dir: screenDir(0.92, 0.55), dist: RH, dotted: true },
      { key: "ll", dir: screenDir(-0.92, -0.55), dist: RH, dotted: true },
      { key: "lr", dir: screenDir(0.92, -0.55), dist: RH, dotted: true },
    ];

    const servers: THREE.Group[] = [];
    interface Connector {
      key: string;
      dir: THREE.Vector3;
      dist: number;
      dotted: boolean;
      pos: THREE.Vector3;
      server: THREE.Group;
      line: THREE.Line;
      from: THREE.Vector3;
      to: THREE.Vector3;
      node: THREE.Sprite;
      buildParticle: THREE.Sprite;
      streams: { sprite: THREE.Sprite; dir: number; t: number; speed: number }[];
      glow: number;
      burst: number;
    }
    const connectors: Connector[] = [];

    const CENTER_HALF = CENTER_SIZE / 2;

    layout.forEach((L) => {
      const pos = L.dir.clone().multiplyScalar(L.dist);
      const srv = makeServerCube(SERVER_SIZE, { dotted: L.dotted });
      srv.position.copy(pos);
      root.add(srv);

      const from = L.dir.clone().multiplyScalar(CENTER_HALF + 0.15);
      const nearFace = SERVER_SIZE * 0.62;
      const to = pos.clone().sub(L.dir.clone().multiplyScalar(nearFace));
      const lgeo = new THREE.BufferGeometry().setFromPoints([from.clone(), from.clone()]);
      const lmat = lineMat(1);
      const line = new THREE.Line(lgeo, lmat);
      root.add(line);

      const cnode = glowNode(0.55);
      cnode.position.copy(to);
      cnode.material.opacity = 0;
      root.add(cnode);

      // Build travel particle
      const bpr = glowNode(0.5);
      bpr.material.opacity = 0;
      root.add(bpr);

      const obj: Connector = {
        key: L.key,
        dir: L.dir,
        dist: L.dist,
        dotted: L.dotted,
        pos,
        server: srv,
        line,
        from,
        to,
        node: cnode,
        buildParticle: bpr,
        streams: [],
        glow: 0,
        burst: 0,
      };

      srv.userData.restPos = pos.clone();
      srv.userData.floatPhase = Math.random() * Math.PI * 2;
      srv.userData.floatSpeed = 0.6 + Math.random() * 0.5;

      servers.push(srv);
      connectors.push(obj);
    });

    const PARTS_OUT = 2;
    const PARTS_IN = 2;

    function buildStreams() {
      connectors.forEach((c) => {
        c.streams = [];
        for (let i = 0; i < PARTS_OUT; i++) {
          const s = glowNode(0.38);
          s.material.opacity = 0;
          root.add(s);
          c.streams.push({ sprite: s, dir: 1, t: i / PARTS_OUT, speed: 0.34 + Math.random() * 0.12 });
        }
        for (let i = 0; i < PARTS_IN; i++) {
          const s = glowNode(0.32);
          s.material.opacity = 0;
          root.add(s);
          c.streams.push({ sprite: s, dir: -1, t: i / PARTS_IN, speed: 0.3 + Math.random() * 0.12 });
        }
        c.glow = 0;
        c.burst = 0;
      });
    }

    // Animation timeline parameters
    const T = {
      center: [0.0, 1.4],
      inner: [1.0, 1.8],
      servers: [] as any[],
      depth: [0, 0],
      flow: [0, 0],
    };

    let cursor = 1.8;
    const SRV_DUR = 0.9;
    const order = ["top", "ur", "lr", "bottom", "ll", "ul"];
    for (const key of order) {
      T.servers.push({
        key,
        t0: cursor,
        line0: cursor,
        lineDur: 0.45,
        cubeDur: SRV_DUR,
        t1: cursor + 0.45 + SRV_DUR,
      });
      cursor += 0.55;
    }
    T.depth = [cursor + 0.1, cursor + 1.6];
    cursor += 1.7;
    T.flow = [cursor, cursor + 0.6];
    const FLOW_START = T.flow[0];

    const clock = new THREE.Clock();
    let elapsed = 0;

    function easeOut(x: number) {
      return 1 - Math.pow(1 - x, 3);
    }
    function seg(t: number, a: number, b: number) {
      return Math.max(0, Math.min(1, (t - a) / (b - a)));
    }

    let flowInit = false;
    let nextBurst = 0;
    const centerCore = center;

    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;
      const t = elapsed;

      // 1. Central cube draw
      drawCube(centerCore, easeOut(seg(t, T.center[0], T.center[1])));

      // Central core breathing/light burst
      const coreBreath = 0.78 + 0.22 * Math.sin(t * 1.1);
      let coreBurst = 0;
      const burstPeriod = 6.5;
      const bp = (t % burstPeriod) / burstPeriod;
      if (bp < 0.1) coreBurst = Math.sin((bp / 0.1) * Math.PI) * 0.6;

      const coreSegs = centerCore.userData.segs as THREE.Line[];
      if (coreSegs) {
        coreSegs.forEach((s) => {
          const drawn = s.geometry.attributes.position.count > 0;
          s.material.opacity = drawn ? Math.min(1, 0.85 * coreBreath + coreBurst) : s.material.opacity;
        });
      }

      // Inner nodes pulsing/breathing
      const ip = seg(t, T.inner[0], T.inner[1]);
      innerNodes.forEach((n, i) => {
        const pulse = 0.55 + 0.45 * Math.sin(t * 2.2 + i * 1.7);
        n.material.opacity = ip * (0.55 + 0.45 * pulse) * coreBreath + ip * coreBurst;
        const s = 0.9 * (0.82 + 0.18 * pulse) * (1 + coreBurst * 0.5);
        n.scale.set(s, s, 1);
      });

      // 2-7. Servers build sequence
      T.servers.forEach((S) => {
        const conn = connectors.find((c) => c.key === S.key);
        if (!conn) return;

        // Line growth
        const lp = easeOut(seg(t, S.line0, S.line0 + S.lineDur));
        const cur = conn.from.clone().lerp(conn.to, lp);
        conn.line.geometry.setFromPoints([conn.from, cur]);
        conn.line.visible = lp > 0;

        // Build particle traversal
        const bpr = conn.buildParticle;
        if (lp > 0 && lp < 1) {
          bpr.position.copy(cur);
          bpr.material.opacity = 0.95;
          const ps = 0.5 * (0.8 + 0.4 * Math.sin(t * 12));
          bpr.scale.set(ps, ps, 1);
        } else if (lp >= 1 && bpr.material.opacity > 0) {
          bpr.material.opacity = Math.max(0, bpr.material.opacity - dt * 4);
        }

        // Connection node glow activation
        conn.node.material.opacity = Math.max(conn.node.material.opacity, lp);

        // Cube outline draw
        const cp = easeOut(seg(t, S.line0 + S.lineDur * 0.6, S.t1));
        const sCube = conn.server.userData.cube as THREE.Group;
        if (sCube) drawCube(sCube, cp);

        const sDetail = conn.server.userData.detail as THREE.Group;
        if (sDetail) {
          sDetail.visible = cp > 0.8;
          sDetail.traverse((o) => {
            if (o instanceof THREE.Line || o instanceof THREE.Mesh) {
              const m = o.material as THREE.Material;
              if (m) {
                m.opacity = cp > 0.8 ? (cp - 0.8) / 0.2 : 0;
              }
            }
          });
        }
      });

      // 8. Depth dotted cube draw
      const dpr = easeOut(seg(t, T.depth[0], T.depth[1]));
      drawCube(depthCube, dpr);
      const dSegs = depthCube.userData.segs as THREE.Line[];
      if (dSegs) {
        dSegs.forEach((s) => {
          s.material.opacity = 0.5 * dpr;
        });
      }

      // Server float motion (rest positions bobbing)
      servers.forEach((srv) => {
        const u = srv.userData;
        if (!u.restPos) return;
        const bob = Math.sin(t * u.floatSpeed + u.floatPhase) * 0.05;
        const sway = Math.cos(t * u.floatSpeed * 0.7 + u.floatPhase) * 0.03;
        srv.position.set(u.restPos.x + sway, u.restPos.y + bob, u.restPos.z + sway);
      });

      // 9. Network active data flow streams
      if (t >= FLOW_START) {
        if (!flowInit) {
          buildStreams();
          flowInit = true;
          nextBurst = t + 1.5;
        }
        const actFade = seg(t, FLOW_START, FLOW_START + 0.8);

        // Random pulse burst
        if (t >= nextBurst) {
          const c = connectors[Math.floor(Math.random() * connectors.length)];
          c.burst = 1;
          nextBurst = t + 0.6 + Math.random() * 1.8;
        }

        connectors.forEach((c, ci) => {
          c.burst = Math.max(0, c.burst - dt * 1.6);
          let nearTip = 0;

          c.streams.forEach((st) => {
            st.t += dt * st.speed;
            if (st.t > 1) st.t -= 1;
            const along = st.dir === 1 ? st.t : 1 - st.t;
            const pos = c.from.clone().lerp(c.to, along);
            st.sprite.position.copy(pos);
            const fade = Math.sin(st.t * Math.PI);
            st.sprite.material.opacity = 0.85 * fade * actFade * (st.dir === 1 ? 1 : 0.7);
            const s = (st.dir === 1 ? 0.38 : 0.32) * (0.85 + 0.3 * fade);
            st.sprite.scale.set(s, s, 1);
            nearTip = Math.max(nearTip, fade);
          });

          const targetGlow = (0.5 + 0.5 * nearTip) * 0.55 + c.burst * 0.45;
          c.glow += (targetGlow - c.glow) * Math.min(1, dt * 6);
          c.line.material.opacity = Math.min(1, 0.45 + 0.55 * c.glow * actFade);

          const pulse = 0.6 + 0.4 * Math.sin(t * 2.5 + ci);
          c.node.material.opacity = Math.min(1, 0.7 + 0.3 * pulse + c.burst * 0.5);
          const ns = 0.55 * (0.85 + 0.2 * pulse + c.burst * 0.4);
          c.node.scale.set(ns, ns, 1);
        });
      } else {
        connectors.forEach((c, i) => {
          if (c.node.material.opacity > 0.05) {
            const pulse = 0.6 + 0.4 * Math.sin(t * 2.5 + i);
            const ns = 0.55 * (0.85 + 0.2 * pulse);
            c.node.scale.set(ns, ns, 1);
          }
        });
      }

      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Points
        ) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            (obj.material as THREE.Material).dispose();
          }
        }
        if (obj instanceof THREE.Sprite) {
          obj.material?.dispose();
        }
      });
      glowTex.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] relative cursor-crosshair select-none"
    />
  );
}
