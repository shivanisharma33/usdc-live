"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Token3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Renderer with ACES Filmic Tone Mapping for premium photorealism
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    // Lights - Configured to replicate the glossy blue and cyan/purple highlights in the image
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    // Top-Left Intense Cyan SpotLight
    const cyanLight = new THREE.SpotLight(0x06b6d4, 18, 12, Math.PI / 4, 0.5, 1);
    cyanLight.position.set(-3.5, 3.5, 3.5);
    scene.add(cyanLight);

    // Bottom-Right Deep Blue / Purple PointLight
    const blueLight = new THREE.PointLight(0x3b82f6, 12, 10);
    blueLight.position.set(3, -2.5, 2.5);
    scene.add(blueLight);

    // Dynamic Mouse Follow Light - moves slightly with pointer to shift specs on chrome logo
    const followLight = new THREE.PointLight(0xffffff, 4, 8);
    followLight.position.set(0, 0, 3);
    scene.add(followLight);

    // Strong White Directional Backlight for reeded edge highlights
    const rimLight = new THREE.DirectionalLight(0xffffff, 4.5);
    rimLight.position.set(0, 0, -4.5);
    scene.add(rimLight);

    // Token Group
    const tokenGroup = new THREE.Group();
    scene.add(tokenGroup);

    // --- MATERIALS ---
    // Premium Metallic Blue for Coin Body
    const blueMetallicMat = new THREE.MeshPhysicalMaterial({
      color: 0x004182, // Royal blue base
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.5, // Lacquered shiny finish
      clearcoatRoughness: 0.1,
    });

    // Premium Silver/Chrome for Logo and Text
    const silverChromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc, // Platinum white
      metalness: 0.98,
      roughness: 0.1,
      clearcoat: 0.4,
      clearcoatRoughness: 0.08,
    });

    // --- COIN BODY ---
    // 1. Central Core base cylinder (the recessed face area)
    const coreGeo = new THREE.CylinderGeometry(1.70, 1.70, 0.20, 64);
    const coreMesh = new THREE.Mesh(coreGeo, blueMetallicMat);
    coreMesh.rotation.x = Math.PI / 2;
    tokenGroup.add(coreMesh);

    // 2. Extruded Outer Rim border ring (creates the physical raised rim face on front & back)
    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, 1.80, 0, Math.PI * 2, false);
    const ringHole = new THREE.Path();
    ringHole.absarc(0, 0, 1.68, 0, Math.PI * 2, true);
    ringShape.holes.push(ringHole);

    const rimExtrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    };
    const rimGeo = new THREE.ExtrudeGeometry(ringShape, rimExtrudeSettings);
    const rimMesh = new THREE.Mesh(rimGeo, blueMetallicMat);
    // Center the rim over the core mesh
    rimMesh.position.z = -0.11;
    tokenGroup.add(rimMesh);

    // 3. Thin decorative silver bezel line inside the rim
    const bezelRingGeo = new THREE.TorusGeometry(1.67, 0.015, 8, 100);
    const bezelFront = new THREE.Mesh(bezelRingGeo, silverChromeMat);
    bezelFront.position.z = 0.105;
    tokenGroup.add(bezelFront);

    const bezelBack = bezelFront.clone();
    bezelBack.position.z = -0.105;
    tokenGroup.add(bezelBack);

    // 4. Reeded Edge Ridges (Vertical grooves around the circumference using InstancedMesh)
    const ridgeCount = 120;
    const ridgeGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.218, 4);
    const ridgeMat = new THREE.MeshStandardMaterial({
      color: 0x002c5c, // Slightly darker metallic blue in the grooves
      metalness: 0.95,
      roughness: 0.2,
    });
    const instancedRidges = new THREE.InstancedMesh(ridgeGeo, ridgeMat, ridgeCount);
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < ridgeCount; i++) {
      const angle = (i / ridgeCount) * Math.PI * 2;
      // Position right on the outer edge
      dummy.position.set(Math.cos(angle) * 1.795, 0, Math.sin(angle) * 1.795);
      dummy.rotation.set(0, -angle, 0);
      dummy.updateMatrix();
      instancedRidges.setMatrixAt(i, dummy.matrix);
    }
    // InstancedMesh orientation aligns with scene. Since core/rim rotates, we place it in tokenGroup
    instancedRidges.rotation.x = Math.PI / 2;
    tokenGroup.add(instancedRidges);


    // --- USDC LOGO TEXTURE LOADING ---
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/USDC_3 1.avif");
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.minFilter = THREE.LinearFilter;

    // Define logo plate size using 2.82 width-to-height aspect ratio from navbar dimensions (130 / 46)
    const plateWidth = 1.85;
    const plateHeight = plateWidth / (130 / 46); // ~0.655 height
    const logoPlateGeo = new THREE.PlaneGeometry(plateWidth, plateHeight);
    
    // Create reflective/glossy material for the logo texture
    const logoPlateMat = new THREE.MeshPhysicalMaterial({
      map: logoTexture,
      transparent: true,
      metalness: 0.25,
      roughness: 0.15,
      clearcoat: 0.3,
      depthWrite: false, // Prevents transparency Z-sorting glitches
      side: THREE.DoubleSide
    });

    // Front Logo Plate
    const logoFront = new THREE.Mesh(logoPlateGeo, logoPlateMat);
    logoFront.position.z = 0.105; // offset slightly from coin front recess face
    tokenGroup.add(logoFront);

    // Back Logo Plate (rotated facing rear)
    const logoBack = logoFront.clone();
    logoBack.position.z = -0.105;
    logoBack.rotation.y = Math.PI;
    tokenGroup.add(logoBack);


    // --- AMBIENT PARTICLE FIELD ---
    // Floating ambient gold/cyan nodes around the coin
    const particlesCount = 70;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.1 + Math.random() * 1.6;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = (Math.random() - 0.5) * 3.5;
      positions[i + 2] = (Math.random() - 0.5) * 3;
      speeds[i / 3] = 0.004 + Math.random() * 0.012;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0x06b6d4, // Cyan glow
      size: 0.042,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(particlesGeo, particleMat);
    scene.add(pointCloud);


    // --- MOUSE MOVEMENT INTERACTION ---
    const mouse = { x: 0.25, y: 0.15 }; // Initial tilted angle default
    const target = { x: 0.25, y: 0.15 };

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      // Normalized coordinates (-1 to 1)
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);


    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Continuous slow idle spin
      tokenGroup.rotation.y = time * 0.45;
      tokenGroup.rotation.x = Math.sin(time * 0.4) * 0.12;

      // Floating vertical drift (Sine wave)
      tokenGroup.position.y = Math.sin(time * 1.35) * 0.15;

      // Smooth mouse follow interpolation
      target.x += (mouse.x * 0.85 - target.x) * 0.07;
      target.y += (mouse.y * 0.85 - target.y) * 0.07;

      // Apply tilt parallax
      tokenGroup.rotation.y += target.x * 0.6;
      tokenGroup.rotation.x -= target.y * 0.6;

      // Position the dynamic light slightly based on the mouse to shift specs
      followLight.position.x = target.x * 3.5;
      followLight.position.y = target.y * 3.5;

      // Animate ambient point cloud coordinates
      const positionAttr = pointCloud.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particlesCount; i++) {
        const px = positionAttr.getX(i);
        const pz = positionAttr.getZ(i);
        const rotSpeed = speeds[i];
        
        // Spin around Y axis
        const newX = px * Math.cos(rotSpeed) - pz * Math.sin(rotSpeed);
        const newZ = px * Math.sin(rotSpeed) + pz * Math.cos(rotSpeed);
        
        positionAttr.setX(i, newX);
        positionAttr.setZ(i, newZ);
        
        // Small drift in vertical height
        const py = positionAttr.getY(i);
        positionAttr.setY(i, py + Math.sin(time * 0.8 + i) * 0.0015);
      }
      positionAttr.needsUpdate = true;

      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup Resources
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Dispose Geometries & Textures
      coreGeo.dispose();
      rimGeo.dispose();
      bezelRingGeo.dispose();
      ridgeGeo.dispose();
      logoPlateGeo.dispose();
      logoTexture.dispose();
      particlesGeo.dispose();

      // Dispose Materials
      blueMetallicMat.dispose();
      silverChromeMat.dispose();
      logoPlateMat.dispose();
      ridgeMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[450px] flex items-center justify-center">
      {/* Intense radial glow mimicking the background lights in the image */}
      <div className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none animate-pulse" />
      <div className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none animate-pulse delay-100" />
      
      {/* Canvas container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
    </div>
  );
}
