import { useState, useEffect, useRef, useMemo } from "react";

const SKILLS = [
  { name: "React 19", category: "Frontend", level: "Expert", color: "#38bdf8" },
  { name: "Next.js 15", category: "Fullstack", level: "Expert", color: "#ffffff" },
  { name: "Node.js", category: "Backend", level: "Advanced", color: "#22c55e" },
  { name: "Three.js", category: "3D & WebGL", level: "Advanced", color: "#a855f7" },
  { name: "TailwindCSS", category: "Styling", level: "Expert", color: "#38bdf8" },
  { name: "MongoDB", category: "Database", level: "Advanced", color: "#10b981" },
  { name: "TypeScript", category: "Language", level: "Advanced", color: "#3b82f6" },
  { name: "Express.js", category: "Backend", level: "Expert", color: "#f59e0b" },
  { name: "React Native", category: "Mobile", level: "Advanced", color: "#60a5fa" },
  { name: "REST APIs", category: "Architecture", level: "Expert", color: "#ec4899" },
  { name: "PostgreSQL", category: "Database", level: "Proficient", color: "#6366f1" },
  { name: "Docker", category: "DevOps", level: "Proficient", color: "#0ea5e9" },
  { name: "Redux / Zustand", category: "State", level: "Expert", color: "#8b5cf6" },
  { name: "GraphQL", category: "API", level: "Proficient", color: "#f43f5e" },
  { name: "Git & CI/CD", category: "DevOps", level: "Advanced", color: "#f97316" },
  { name: "UI/UX & Figma", category: "Design", level: "Advanced", color: "#a855f7" },
];

const TechSphere = ({ radius = 170 }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);
  const [isHovered, setIsHovered] = useState(false);
  const velocityRef = useRef({ x: 0.003, y: 0.005 });

  // Calculate spherical distribution
  const items = useMemo(() => {
    const total = SKILLS.length;
    return SKILLS.map((skill, index) => {
      const phi = Math.acos(-1 + (2 * index + 1) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        ...skill,
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
      };
    });
  }, [radius]);

  // Continuous auto-rotation with inertia
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (!isHovered) {
        setRotation((prev) => ({
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y,
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    velocityRef.current = {
      x: -y * 0.015,
      y: x * 0.015,
    };
  };

  // Transform 3D coordinates based on rotation angles
  const computedItems = items.map((item) => {
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    // Rotate around Y axis
    let x1 = item.baseX * cosY + item.baseZ * sinY;
    let z1 = -item.baseX * sinY + item.baseZ * cosY;

    // Rotate around X axis
    let y2 = item.baseY * cosX - z1 * sinX;
    let z2 = item.baseY * sinX + z1 * cosX;

    // Perspective projection
    const scale = (z2 + radius * 1.6) / (radius * 2.6);
    const alpha = Math.max(0.2, (z2 + radius) / (radius * 2));
    const zIndex = Math.floor(scale * 100);

    return {
      ...item,
      screenX: x1,
      screenY: y2,
      scale: Math.max(0.65, scale),
      opacity: alpha,
      zIndex,
    };
  });

  return (
    <div className="flex flex-col items-center">
      {/* 3D Sphere Interactive Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      >
        {/* Core Glowing Orb in Center */}
        <div className="absolute w-36 h-36 rounded-full bg-blue-500/10 filter blur-2xl animate-pulse-glow pointer-events-none" />

        {computedItems.map((item, index) => {
          const isSelected = selectedSkill?.name === item.name;
          return (
            <button
              key={index}
              onClick={() => setSelectedSkill(item)}
              style={{
                transform: `translate3d(${item.screenX}px, ${item.screenY}px, 0) scale(${item.scale})`,
                opacity: item.opacity,
                zIndex: item.zIndex,
              }}
              className={`
                absolute px-3 py-1.5 rounded-full text-xs font-semibold
                transition-all duration-100 ease-out border backdrop-blur-md
                flex items-center gap-1.5 shadow-lg
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400/50 scale-110 shadow-blue-500/50"
                    : "bg-slate-900/80 text-gray-200 border-white/10 hover:border-blue-400 hover:text-white"
                }
              `}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Selected Skill Quick Detail Badge */}
      {selectedSkill && (
        <div className="mt-4 px-5 py-2.5 rounded-xl glass-panel-glow flex items-center gap-4 text-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: selectedSkill.color }}
            />
            <span className="font-bold text-white">{selectedSkill.name}</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
            {selectedSkill.category}
          </span>
          <span className="text-xs text-gray-400">
            Proficiency:{" "}
            <span className="text-green-400 font-semibold">
              {selectedSkill.level}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default TechSphere;
