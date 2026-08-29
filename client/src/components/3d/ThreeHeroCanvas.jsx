import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeHeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group to hold all 3D elements for mouse parallax rotation
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Floating 3D Geometric Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(7, 1);
    const icoWireframeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.5,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoWireframeMat);
    group.add(icoMesh);

    // Inner Glowing Core
    const innerGeometry = new THREE.OctahedronGeometry(4, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // Outer Orbiting Torus
    const torusGeometry = new THREE.TorusGeometry(10, 0.15, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.rotation.x = Math.PI / 3;
    group.add(torusMesh);

    // 2. Interactive Star/Particle Constellation
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 30;
      speeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.25,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // 3. Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLightBlue = new THREE.PointLight(0x38bdf8, 3, 50);
    pointLightBlue.position.set(15, 10, 10);
    scene.add(pointLightBlue);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 3, 50);
    pointLightPurple.position.set(-15, -10, 10);
    scene.add(pointLightPurple);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Window Resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 1.5 + elapsedTime * 0.08;
      group.rotation.x = targetY * 1.5 + Math.sin(elapsedTime * 0.2) * 0.05;

      // Independent rotations
      icoMesh.rotation.y = elapsedTime * 0.15;
      icoMesh.rotation.x = elapsedTime * 0.1;

      innerMesh.rotation.y = -elapsedTime * 0.25;
      innerMesh.rotation.z = elapsedTime * 0.2;

      torusMesh.rotation.z = elapsedTime * 0.1;
      torusMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.4;

      // Subtle particle float
      const positionsArray = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsArray[i3] += speeds[i].x;
        positionsArray[i3 + 1] += speeds[i].y;
        positionsArray[i3 + 2] += speeds[i].z;

        // Wrap around boundaries
        if (Math.abs(positionsArray[i3]) > 25) speeds[i].x *= -1;
        if (Math.abs(positionsArray[i3 + 1]) > 20) speeds[i].y *= -1;
        if (Math.abs(positionsArray[i3 + 2]) > 15) speeds[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoWireframeMat.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default ThreeHeroCanvas;
