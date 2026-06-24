/* global THREE */
"use strict";

(function initNotebookScene() {
  const MOBILE_MQ = window.matchMedia("(max-width: 767px)");
  const REDUCED_MOTION_MQ = window.matchMedia("(prefers-reduced-motion: reduce)");

  const TOTAL_SITE_ROTATIONS = 1;
  const ROTATION_LERP = 0.08;

  let renderer;
  let scene;
  let camera;
  let notebook;
  let rafId = null;
  let scrollProgress = 0;
  let targetRotationY = 0;
  let currentRotationY = 0;

  function isNotebookEnabled() {
    return typeof THREE !== "undefined" && !MOBILE_MQ.matches;
  }

  function createCanvasTexture(drawFn, size = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    drawFn(canvas.getContext("2d"), size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function createLeatherTextures() {
    const map = createCanvasTexture((ctx, size) => {
      ctx.fillStyle = "#1a2438";
      ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < 12000; i += 1) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const tone = 18 + Math.random() * 45;
        ctx.fillStyle = `rgba(${tone}, ${tone + 8}, ${tone + 18}, ${0.025 + Math.random() * 0.07})`;
        ctx.fillRect(x, y, 1 + Math.random() * 2.5, 1 + Math.random() * 2.5);
      }

      for (let i = 0; i < 18; i += 1) {
        ctx.strokeStyle = `rgba(255,255,255,${0.015 + Math.random() * 0.025})`;
        ctx.lineWidth = 0.4 + Math.random() * 1.2;
        ctx.beginPath();
        const startX = Math.random() * size;
        const startY = Math.random() * size;
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
          startX + Math.random() * 80 - 40,
          startY + Math.random() * 80 - 40,
          startX + Math.random() * 120 - 60,
          startY + Math.random() * 120 - 60,
          startX + Math.random() * 160 - 80,
          startY + Math.random() * 160 - 80
        );
        ctx.stroke();
      }
    }, 512);

    const bumpMap = createCanvasTexture((ctx, size) => {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < 9000; i += 1) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const v = 110 + Math.random() * 35;
        ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
        ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
      }
    }, 512);

    map.repeat.set(1.8, 1.8);
    bumpMap.repeat.set(1.8, 1.8);

    return { map, bumpMap };
  }

  function createPaperTextures() {
    const map = createCanvasTexture((ctx, size) => {
      ctx.fillStyle = "#f4efe4";
      ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < 6000; i += 1) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.fillStyle = `rgba(${180 + Math.random() * 40}, ${170 + Math.random() * 35}, ${150 + Math.random() * 30}, 0.04)`;
        ctx.fillRect(x, y, 1, 2 + Math.random() * 4);
      }

      ctx.strokeStyle = "rgba(200, 190, 170, 0.08)";
      ctx.lineWidth = 1;
      for (let y = 48; y < size; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }
    }, 512);

    const bumpMap = createCanvasTexture((ctx, size) => {
      ctx.fillStyle = "#c0c0c0";
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 5000; i += 1) {
        const v = 115 + Math.random() * 25;
        ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
        ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
      }
    }, 256);

    map.repeat.set(1.2, 1.2);
    return { map, bumpMap };
  }

  function createRealisticMaterial(options) {
    const {
      color = 0xffffff,
      map = null,
      bumpMap = null,
      bumpScale = 0.015,
      roughness = 0.75,
      metalness = 0,
      clearcoat = 0,
      clearcoatRoughness = 0.35,
      sheen = 0,
      sheenRoughness = 0.5,
      sheenColor = 0xffffff
    } = options;

    return new THREE.MeshPhysicalMaterial({
      color,
      map,
      bumpMap,
      bumpScale,
      roughness,
      metalness,
      clearcoat,
      clearcoatRoughness,
      sheen,
      sheenRoughness,
      sheenColor,
      flatShading: false
    });
  }

  function createRoundedRectShape(width, height, radius) {
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);
    const shape = new THREE.Shape();

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    return shape;
  }

  function createRoundedSlab(width, height, depth, cornerRadius) {
    const shape = createRoundedRectShape(width, height, cornerRadius);
    const bevel = Math.min(cornerRadius * 0.75, depth * 0.45);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 6,
      curveSegments: 20,
      steps: 1
    });
    geo.center();
    return geo;
  }

  function createNotebook() {
    const group = new THREE.Group();
    const leather = createLeatherTextures();
    const paper = createPaperTextures();

    const coverMat = createRealisticMaterial({
      color: 0xffffff,
      map: leather.map,
      bumpMap: leather.bumpMap,
      bumpScale: 0.028,
      roughness: 0.72,
      metalness: 0.02,
      clearcoat: 0.28,
      clearcoatRoughness: 0.42
    });

    const spineMat = createRealisticMaterial({
      color: 0x121c2e,
      map: leather.map,
      bumpMap: leather.bumpMap,
      bumpScale: 0.035,
      roughness: 0.8,
      metalness: 0.01,
      clearcoat: 0.1
    });

    const pageMat = createRealisticMaterial({
      color: 0xffffff,
      map: paper.map,
      bumpMap: paper.bumpMap,
      bumpScale: 0.008,
      roughness: 0.96,
      metalness: 0
    });

    const pageEdgeMat = createRealisticMaterial({
      color: 0xcfc5b4,
      roughness: 0.98,
      metalness: 0
    });

    const ringMat = createRealisticMaterial({
      color: 0xd4aa4a,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.45,
      clearcoatRoughness: 0.12
    });

    const labelMat = createRealisticMaterial({
      color: 0x25324c,
      map: leather.map,
      bumpMap: leather.bumpMap,
      bumpScale: 0.018,
      roughness: 0.58,
      metalness: 0.04,
      clearcoat: 0.15
    });

    const coverW = 2.48;
    const coverH = 3.18;
    const coverDepth = 0.11;
    const coverRadius = 0.15;

    const backCover = new THREE.Mesh(
      createRoundedSlab(coverW, coverH, coverDepth, coverRadius),
      coverMat
    );
    backCover.position.z = -0.09;
    group.add(backCover);

    const pageBlockW = 2.12;
    const pageBlockH = 2.82;
    const pageLayerDepth = 0.042;
    const pageStartZ = -0.19;
    const pageLayerCount = 8;

    for (let index = 0; index < pageLayerCount; index += 1) {
      const layerMat = pageMat.clone();
      layerMat.color.setHex(0xf8f4ec - index * 0x020201);
      const pageLayer = new THREE.Mesh(
        createRoundedSlab(pageBlockW, pageBlockH, pageLayerDepth, 0.1),
        layerMat
      );
      pageLayer.position.z = pageStartZ + index * pageLayerDepth;
      pageLayer.position.x = index * 0.0015;
      group.add(pageLayer);
    }

    const pageEdge = new THREE.Mesh(
      createRoundedSlab(2.16, 2.86, 0.4, 0.11),
      pageEdgeMat
    );
    pageEdge.position.z = 0.002;
    group.add(pageEdge);

    const frontCover = new THREE.Mesh(
      createRoundedSlab(coverW, coverH, coverDepth, coverRadius),
      coverMat.clone()
    );
    frontCover.position.z = 0.26;
    group.add(frontCover);

    const spine = new THREE.Mesh(
      createRoundedSlab(0.24, coverH, coverDepth + 0.38, 0.09),
      spineMat
    );
    spine.position.set(-1.26, 0, 0.09);
    group.add(spine);

    const ringCount = 9;
    const ringRadius = 0.102;
    const ringTube = 0.025;
    for (let i = 0; i < ringCount; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(ringRadius, ringTube, 20, 40),
        ringMat.clone()
      );
      ring.material.color.offsetHSL(0, 0, (i % 2 === 0 ? 0.02 : -0.02));
      ring.rotation.y = Math.PI / 2;
      ring.position.set(-1.26, -1.18 + i * 0.295, 0.09);
      group.add(ring);
    }

    const label = new THREE.Mesh(
      createRoundedSlab(0.92, 0.36, 0.012, 0.038),
      labelMat
    );
    label.position.set(0.38, 0.98, 0.318);
    group.add(label);

    const labelBorder = new THREE.Mesh(
      createRoundedSlab(0.98, 0.42, 0.006, 0.042),
      createRealisticMaterial({
        color: 0x3a4a68,
        roughness: 0.5,
        metalness: 0.08,
        clearcoat: 0.2
      })
    );
    labelBorder.position.set(0.38, 0.98, 0.312);
    group.add(labelBorder);

    group.rotation.x = -0.3;
    group.rotation.z = 0.38;
    group.scale.set(1.15, 1.15, 1.15);

    return group;
  }

  function createContactShadow() {
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.75, 48),
      new THREE.MeshBasicMaterial({
        color: 0x1a2744,
        transparent: true,
        opacity: 0.11,
        depthWrite: false
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0.05, -1.92, 0.15);
    return shadow;
  }

  function updateScrollProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
    scrollProgress = Math.min(1, Math.max(0, scrollProgress));

    targetRotationY = scrollProgress * TOTAL_SITE_ROTATIONS * Math.PI * 2;
  }

  function onScroll() {
    updateScrollProgress();
  }

  function onResize() {
    if (!camera || !renderer) {
      return;
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function animate() {
    if (!isNotebookEnabled()) {
      return;
    }

    rafId = requestAnimationFrame(animate);

    if (!REDUCED_MOTION_MQ.matches) {
      currentRotationY += (targetRotationY - currentRotationY) * ROTATION_LERP;
    } else {
      currentRotationY = targetRotationY;
    }

    if (notebook) {
      notebook.rotation.y = currentRotationY;
      notebook.rotation.x = -0.3 + scrollProgress * 0.08;
    }

    renderer.render(scene, camera);
  }

  function startLoop() {
    if (rafId !== null) {
      return;
    }
    animate();
  }

  function stopLoop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function initScene() {
    const canvas = document.getElementById("notebook-canvas");
    if (!canvas || typeof THREE === "undefined") {
      return;
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.15, 4.95);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    scene.add(new THREE.HemisphereLight(0xf2f6fc, 0x8a9ab0, 0.62));

    const ambient = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff6eb, 1.15);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd0dff0, 0.48);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.42);
    rimLight.position.set(1, -2, -5);
    scene.add(rimLight);

    const ringHighlight = new THREE.PointLight(0xffe4b0, 0.45, 14);
    ringHighlight.position.set(-2.8, 1.8, 3.5);
    scene.add(ringHighlight);

    notebook = createNotebook();
    scene.add(notebook);
    scene.add(createContactShadow());

    updateScrollProgress();
    currentRotationY = targetRotationY;
  }

  function enableNotebook() {
    const bg = document.getElementById("scene-bg");
    if (!bg) {
      return;
    }

    bg.hidden = false;

    if (!renderer) {
      initScene();
    }

    onResize();
    updateScrollProgress();
    startLoop();
  }

  function disableNotebook() {
    const bg = document.getElementById("scene-bg");
    if (bg) {
      bg.hidden = true;
    }
    stopLoop();
  }

  function handleBreakpointChange() {
    if (isNotebookEnabled()) {
      enableNotebook();
    } else {
      disableNotebook();
    }
  }

  function boot() {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    MOBILE_MQ.addEventListener("change", handleBreakpointChange);
    REDUCED_MOTION_MQ.addEventListener("change", updateScrollProgress);
    handleBreakpointChange();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
