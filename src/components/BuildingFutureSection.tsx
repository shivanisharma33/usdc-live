"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BuildingFutureSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ---- WebGL Renderer ----
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background to match section bg

    const scene = new THREE.Scene();

    // ---- True isometric orthographic camera ----
    let aspect = container.clientWidth / container.clientHeight;
    let frustum = 11.0;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect,
      frustum * aspect,
      frustum,
      -frustum,
      -100,
      200
    );
    camera.position.set(20, 18.8, 20);   // iso-ish, slight top-down
    camera.lookAt(0, 6.0, 0);

    // ---- Lighting (soft, flat illustration) ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.92));
    const key = new THREE.DirectionalLight(0xffffff, 0.30);
    key.position.set(-8, 18, 12);
    scene.add(key);

    // ---- Palette (light technical illustration as provided) ----
    const COL = {
      line:        0x5b6178,   // medium blue-gray outlines
      lineThin:    0x9aa0be,   // thin construction lines
      faceLight:   0xffffff,   // white surfaces
      faceTop:     0xfbfcff,
      faceShade:   0xeef0f8,   // slightly shaded side
      panelFill:   0xdfe3f4,   // lavender-blue glass
      panelFillB:  0xeceef8,
      panelEdge:   0x9097bd,
      black:       0x0a0c12,
      anchor:      0x4f6bd9,   // blue anchor dots (as in reference)
      red:         0xcf4444,
    };

    const root = new THREE.Group();
    scene.add(root);

    // ===== Helpers =====
    function edges(geo: THREE.BufferGeometry, color: number, opacity?: number) {
      const e = new THREE.EdgesGeometry(geo);
      const m = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity === undefined ? 1 : opacity,
      });
      const ls = new THREE.LineSegments(e, m);
      ls.userData.mat = m;
      return ls;
    }

    // solid box with fill + outline
    function box(w: number, h: number, d: number, fillColor: number | null, fillOpacity?: number, edgeColor?: number, edgeOpacity?: number) {
      const g = new THREE.Group();
      const geo = new THREE.BoxGeometry(w, h, d);
      if (fillColor !== null) {
        const mat = new THREE.MeshLambertMaterial({
          color: fillColor,
          transparent: true,
          opacity: fillOpacity === undefined ? 1 : fillOpacity,
          depthWrite: fillOpacity === undefined || fillOpacity >= 1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        g.add(mesh);
        g.userData.fill = mat;
      }
      const e = edges(geo, edgeColor === undefined ? COL.line : edgeColor, edgeOpacity);
      g.add(e);
      g.userData.edge = e.userData.mat;
      return g;
    }

    // wireframe-only box
    function wireBox(w: number, h: number, d: number, color: number, opacity?: number) {
      const geo = new THREE.BoxGeometry(w, h, d);
      return edges(geo, color, opacity);
    }

    // flat thin vertical panel
    function panel(w: number, h: number, fillColor: number, fillOpacity: number, edgeColor: number) {
      const g = new THREE.Group();
      const geo = new THREE.BoxGeometry(w, h, 0.06);
      const mat = new THREE.MeshBasicMaterial({
        color: fillColor,
        transparent: true,
        opacity: fillOpacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      g.add(mesh);
      const e = edges(geo, edgeColor, 1);
      g.add(e);
      g.userData.fill = mat;
      g.userData.edge = e.userData.mat;
      return g;
    }

    // ============================================================
    // 1) BASE PLATFORM
    // ============================================================
    const platform = new THREE.Group();
    root.add(platform);
    const PW = 11.2, PD = 11.2;
    const slab = box(PW, 0.30, PD, COL.faceTop, 1.0, COL.line);
    platform.add(slab);
    const blackUnder = box(PW + 0.1, 0.34, PD + 0.1, COL.black, 1.0, COL.black);
    blackUnder.position.y = -0.34;
    platform.add(blackUnder);

    // ============================================================
    // 2) SERVER UNIT
    // ============================================================
    const server = new THREE.Group();
    root.add(server);
    const SV = 3.0;                     // cube edge
    const serverY = SV / 2 + 0.55;        // floats above platform
    server.position.y = serverY;

    const cube = box(SV, SV, SV, COL.faceLight, 1.0, COL.line);
    server.add(cube);

    const pad = box(SV + 0.55, 0.16, SV + 0.55, COL.black, 1.0, COL.black);
    pad.position.y = -SV / 2 - 0.10;
    server.add(pad);

    // Slots + status light
    function frontFace() {
      const fg = new THREE.Group();
      const faceW = SV * 0.70;
      const n = 3;
      const startY = SV * 0.20;
      const gap = SV * 0.18;
      for (let i = 0; i < n; i++) {
        const sg = new THREE.PlaneGeometry(faceW, 0.16);
        const sm = new THREE.MeshBasicMaterial({ color: COL.faceShade, side: THREE.DoubleSide });
        const slot = new THREE.Mesh(sg, sm);
        slot.position.set(0, startY - i * gap, 0);
        const se = edges(sg, COL.line, 1);
        se.position.copy(slot.position);
        fg.add(slot); fg.add(se);
      }
      const dg = new THREE.CircleGeometry(0.06, 16);
      const dm = new THREE.MeshBasicMaterial({ color: COL.red });
      const dot = new THREE.Mesh(dg, dm);
      dot.position.set(faceW * 0.34, startY, 0.02);
      fg.add(dot);
      return fg;
    }
    const ff = frontFace();
    ff.position.set(0, 0, SV / 2 + 0.02);
    server.add(ff);

    // ============================================================
    // 3) LOWER DASHED BOUNDING BOX + blue anchor dots
    // ============================================================
    const dashed = new THREE.Group();
    root.add(dashed);
    const DBW = 7.4, DBH = 5.0, DBD = 7.4;
    const dashedCenterY = 2.7;
    dashed.position.y = dashedCenterY;

    function dashedBox(w: number, h: number, d: number) {
      const g = new THREE.Group();
      const hw = w / 2, hh = h / 2, hd = d / 2;
      const c = [
        [-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd],
        [-hw, hh, -hd], [hw, hh, -hd], [hw, hh, hd], [-hw, hh, hd],
      ];
      const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
      const pos: number[] = [];
      E.forEach(([a, b]) => {
        pos.push(...c[a], ...c[b]);
      });
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.LineDashedMaterial({
        color: COL.lineThin,
        dashSize: 0.26,
        gapSize: 0.18,
        transparent: true,
        opacity: 1,
      });
      const seg = new THREE.LineSegments(geom, mat);
      seg.computeLineDistances();
      g.add(seg);
      g.userData.mat = mat;
      g.userData.corners = c;
      return g;
    }
    const dbox = dashedBox(DBW, DBH, DBD);
    dashed.add(dbox);

    const anchors: THREE.Mesh[] = [];
    const ag = new THREE.SphereGeometry(0.11, 16, 16);
    const am = new THREE.MeshBasicMaterial({ color: COL.anchor });
    (dbox.userData.corners as number[][]).forEach((p) => {
      const s = new THREE.Mesh(ag, am.clone());
      s.position.set(p[0], p[1], p[2]);
      dashed.add(s);
      anchors.push(s);
    });

    // ============================================================
    // 4) TALL OUTER WIREFRAME ENCLOSURE
    // ============================================================
    const enclosure = new THREE.Group();
    root.add(enclosure);
    const ENW = 7.0, ENH = 6.4, END = 7.0;
    const enclosureCenterY = dashedCenterY + DBH / 2 + ENH / 2 + 0.2;
    enclosure.position.y = enclosureCenterY;
    const wb = wireBox(ENW, ENH, END, COL.line, 1);
    enclosure.add(wb);

    function connectLines() {
      const g = new THREE.Group();
      const ebHalfW = ENW / 2, ebHalfD = END / 2;
      const eY = -ENH / 2;
      const dTopY = (dashedCenterY + DBH / 2) - enclosureCenterY;
      const dHalfW = DBW / 2, dHalfD = DBD / 2;
      const ec = [[-ebHalfW, eY, -ebHalfD], [ebHalfW, eY, -ebHalfD], [ebHalfW, eY, ebHalfD], [-ebHalfW, eY, ebHalfD]];
      const dc = [[-dHalfW, dTopY, -dHalfD], [dHalfW, dTopY, -dHalfD], [dHalfW, dTopY, dHalfD], [-dHalfW, dTopY, dHalfD]];
      const pos: number[] = [];
      for (let i = 0; i < 4; i++) { pos.push(...ec[i], ...dc[i]); }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.LineBasicMaterial({ color: COL.lineThin, transparent: true, opacity: 1 });
      const seg = new THREE.LineSegments(geom, mat);
      g.add(seg);
      g.userData.mat = mat;
      return g;
    }
    const conn = connectLines();
    enclosure.add(conn);

    // ============================================================
    // 5) FLOATING DATA PANELS
    // ============================================================
    const panelsGroup = new THREE.Group();
    root.add(panelsGroup);
    const panels: THREE.Group[] = [];
    const defs = [
      { w: 2.9, h: 3.6, x: -0.5, z: 0.9,  fill: COL.panelFill,  op: 0.62 },
      { w: 2.3, h: 3.2, x:  0.7, z: 0.2,  fill: COL.panelFillB, op: 0.55 },
      { w: 2.0, h: 2.9, x:  1.4, z: -0.4, fill: COL.panelFill,  op: 0.5  },
      { w: 1.8, h: 2.7, x:  2.0, z: -1.0, fill: COL.panelFillB, op: 0.5  },
    ];
    const panelsCenterY = enclosureCenterY - 0.2;
    defs.forEach((d, i) => {
      const p = panel(d.w, d.h, d.fill, d.op, COL.panelEdge);
      p.position.set(d.x, panelsCenterY, d.z);
      p.userData.baseY = panelsCenterY;
      p.userData.phase = i * 0.85;
      panelsGroup.add(p);
      panels.push(p);
    });

    // ============================================================
    // 6) TOP LAYER STACK
    // ============================================================
    const stack = new THREE.Group();
    root.add(stack);
    const stackBottomY = enclosureCenterY + ENH / 2 + 0.15;
    const layerDefs = [
      { w: 6.2, d: 6.2, h: 0.18, y: 0.0  },
      { w: 6.2, d: 6.2, h: 0.18, y: 0.42 },
      { w: 6.2, d: 6.2, h: 0.18, y: 0.84 },
      { w: 6.6, d: 6.6, h: 0.46, y: 1.6  },
    ];
    const layers: THREE.Group[] = [];
    layerDefs.forEach((d, i) => {
      const fill = (i === layerDefs.length - 1) ? COL.faceTop : COL.panelFillB;
      const op   = (i === layerDefs.length - 1) ? 1.0 : 0.92;
      const g = box(d.w, d.h, d.d, fill, op, COL.line);
      const finalY = stackBottomY + d.y;
      g.position.set(0, finalY, 0);
      g.userData.finalY = finalY;
      stack.add(g);
      layers.push(g);
    });

    // ============================================================
    // ANIMATION
    // ============================================================
    function eOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
    function eInOut(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function c01(x: number) { return Math.max(0, Math.min(1, x)); }

    const T = {
      platform: [0.0, 0.9],
      server:   [0.7, 1.7],
      dashed:   [1.5, 2.4],
      enclosure:[2.2, 3.1],
      panels:   [2.9, 4.3],
      stack:    [3.7, 5.1],
    };
    const INTRO_END = 5.3;
    const clock = new THREE.Clock();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // platform rise
      {
        const p = eOutCubic(c01((elapsed - T.platform[0]) / (T.platform[1] - T.platform[0])));
        platform.visible = p > 0.001;
        platform.position.y = (1 - p) * -3.5;
        slab.userData.fill.opacity = p; slab.userData.edge.opacity = p;
        blackUnder.userData.fill.opacity = p; blackUnder.userData.edge.opacity = p;
      }
      // server emerge
      {
        const p = eOutCubic(c01((elapsed - T.server[0]) / (T.server[1] - T.server[0])));
        server.visible = p > 0.001;
        server.position.y = serverY + (1 - p) * -2.6;
        cube.userData.fill.opacity = p; cube.userData.edge.opacity = p;
        pad.userData.fill.opacity = p; pad.userData.edge.opacity = p;
        ff.traverse((n) => {
          if ((n as THREE.Mesh).material) {
            ((n as THREE.Mesh).material as THREE.Material).transparent = true;
            ((n as THREE.Mesh).material as THREE.Material).opacity = p;
          }
        });
      }
      // dashed box draw + anchors
      {
        const p = eInOut(c01((elapsed - T.dashed[0]) / (T.dashed[1] - T.dashed[0])));
        dashed.visible = p > 0.001;
        dbox.userData.mat.opacity = p;
        anchors.forEach((a) => {
          const ap = c01((p - 0.5) * 2);
          a.scale.setScalar(fadeOutCubic(ap));
        });
      }
      // enclosure wireframe draw
      {
        const p = eInOut(c01((elapsed - T.enclosure[0]) / (T.enclosure[1] - T.enclosure[0])));
        enclosure.visible = p > 0.001;
        wb.userData.mat.opacity = p;
        conn.userData.mat.opacity = p * 0.9;
      }
      // panels rise one by one + hover
      {
        panels.forEach((g, i) => {
          const segmentVal = (T.panels[1] - T.panels[0]) / panels.length;
          const start = T.panels[0] + i * segmentVal * 0.7;
          const pr = eOutCubic(c01((elapsed - start) / segmentVal));
          g.visible = pr > 0.001;
          const fromY = g.userData.baseY - 3.4;
          let y = fromY + (g.userData.baseY - fromY) * pr;
          if (elapsed > INTRO_END) {
            y += Math.sin(elapsed * 0.9 + g.userData.phase) * 0.09;
          }
          g.position.y = y;
          g.userData.fill.opacity = pr * defs[i].op;
          g.userData.edge.opacity = pr;
        });
      }
      // top stack descend
      {
        layers.forEach((g, i) => {
          const segmentVal = (T.stack[1] - T.stack[0]) / layers.length;
          const start = T.stack[0] + i * segmentVal * 0.7;
          const pr = eOutCubic(c01((elapsed - start) / segmentVal));
          g.visible = pr > 0.001;
          const fromY = g.userData.finalY + 4.5;
          g.position.y = fromY + (g.userData.finalY - fromY) * pr;
          const baseOp = (i === layers.length - 1) ? 1.0 : 0.92;
          g.userData.fill.opacity = baseOp * pr;
          g.userData.edge.opacity = pr;
        });
      }

      // Rotate group slightly for standard isometric feel
      root.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
    }
    
    function fadeOutCubic(tVal: number) {
      return 1 - Math.pow(1 - tVal, 3);
    }

    animate();

    // ---- Resize handler ----
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      aspect = w / h;
      camera.left = -frustum * aspect;
      camera.right = frustum * aspect;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-[#04070f] py-20 md:py-28 text-white select-none overflow-hidden relative border-t border-white/[0.03]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Interactive Three.js WebGL 3D Model ── */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full">
            <div ref={containerRef} className="w-full max-w-[580px] h-[480px] sm:h-[580px] flex items-center justify-center overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
            </div>
          </div>

          {/* ── Right Column: Clean Copy & Action Button ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Title Heading */}
            <h2 className="text-[40px] md:text-[50px] font-bold tracking-tight text-white leading-[1.1] mb-6 font-sans">
              Building the <span className="text-[#3daeff]">future</span> <br />
              from day one
            </h2>

            {/* Paragraph Subtitle Description */}
            <p className="text-[15px] md:text-[16px] text-white/50 font-normal leading-[1.75] max-w-[540px] mb-8 font-sans">
              Lorem ipsum dolor sit amet consectetur nec scelerisque nibh
              volutpat ante a enim augue sed tincidunt pellentesque amet
              blandit egestas morbi quam ornare neque ac sit quis in a elit vel
              ac euismod vitae cras nunc elit fringilla tempor ornare ridiculus
              velit viverra pretium et tellus sit sed cras vulputate.
            </p>

            {/* Blue Action Button */}
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#3daeff] hover:bg-[#52b9ff] text-white text-[13px] font-bold rounded-lg transition-all duration-200"
            >
              <span>Join our team</span>
              <ChevronRight className="w-4 h-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
