import React, { useEffect, useRef, useState } from 'react';
import { OrbState } from '../types';
import { Mic, Volume2, Sparkles, AlertTriangle, Radio } from 'lucide-react';

interface CentralOrbProps {
  state: OrbState;
  onClick: () => void;
  audioActive: boolean;
  spokenText?: string;
  bossName?: string;
}

export const CentralOrb: React.FC<CentralOrbProps> = ({ 
  state, 
  onClick, 
  audioActive, 
  spokenText,
  bossName = "Boss Lux"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [displayedSubtitle, setDisplayedSubtitle] = useState<string>('');

  // Synchronized written subtitle text with typewriter animation when FRIDAY speaks
  useEffect(() => {
    const textToDisplay = spokenText || `Systems nominal, ${bossName}. FRIDAY has full PC access and is standing by.`;
    
    // Animate typing for spoken text
    let currentIndex = 0;
    setDisplayedSubtitle('');
    
    const interval = setInterval(() => {
      currentIndex += 2;
      if (currentIndex <= textToDisplay.length + 1) {
        setDisplayedSubtitle(textToDisplay.slice(0, currentIndex));
      } else {
        setDisplayedSubtitle(textToDisplay);
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [spokenText, bossName]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotationY = 0;
    let rotationX = 0.32; // ~18 degree axial tilt for realistic technological globe
    let pulse = 0;
    let packetPhase = 0;

    // Generate 128 Fibonacci sphere lattice nodes for realistic 3D sphere distribution
    const numNodes = 120;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const sphereRadius = 102;

    const baseNodes = Array.from({ length: numNodes }, (_, i) => {
      const y = 1 - (i / (numNodes - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      return {
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        id: i,
        blinkSpeed: 0.02 + (i % 5) * 0.015,
        baseColor: (i % 7 === 0) ? '#ffffff' : (i % 3 === 0) ? '#38bdf8' : '#00ffff'
      };
    });

    // Dynamic data arcs connecting pairs of nodes
    const dataArcs = [
      { from: 12, to: 45, progress: 0.1, speed: 0.018 },
      { from: 24, to: 88, progress: 0.6, speed: 0.022 },
      { from: 60, to: 104, progress: 0.3, speed: 0.015 },
      { from: 5, to: 72, progress: 0.8, speed: 0.025 },
      { from: 33, to: 95, progress: 0.4, speed: 0.02 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const speedMultiplier = state === 'speaking' ? 2.8 : state === 'listening' ? 3.0 : state === 'processing' ? 4.5 : 1.2;
      rotationY += 0.012 * speedMultiplier;
      pulse += 0.05 * speedMultiplier;
      packetPhase += 0.04 * speedMultiplier;

      const dynamicRadius = sphereRadius + Math.sin(pulse) * (state === 'speaking' || state === 'listening' ? 6 : 2);

      // Helper 3D Projection function with camera perspective
      const project3D = (x: number, y: number, z: number) => {
        // 1. Rotate around Y axis
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // 2. Rotate around X axis (axial tilt)
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // 3. Perspective projection
        const cameraDist = 380;
        const perspective = cameraDist / (cameraDist - z2);
        return {
          px: cx + x1 * perspective,
          py: cy + y2 * perspective,
          pz: z2,
          scale: perspective,
          isFront: z2 > -10
        };
      };

      // -------------------------------------------------------------
      // 1. BACKGROUND AMBIENT NEURAL HALO & QUANTUM GLOW
      // -------------------------------------------------------------
      const bgGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, dynamicRadius + 45);
      if (state === 'alert') {
        bgGlow.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
        bgGlow.addColorStop(0.5, 'rgba(220, 38, 38, 0.15)');
        bgGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else if (state === 'speaking') {
        bgGlow.addColorStop(0, 'rgba(0, 255, 255, 0.5)');
        bgGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.2)');
        bgGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else if (state === 'listening') {
        bgGlow.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
        bgGlow.addColorStop(0.5, 'rgba(2, 132, 199, 0.2)');
        bgGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else {
        bgGlow.addColorStop(0, 'rgba(0, 216, 255, 0.35)');
        bgGlow.addColorStop(0.5, 'rgba(3, 105, 161, 0.12)');
        bgGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
      }

      ctx.beginPath();
      ctx.arc(cx, cy, dynamicRadius + 45, 0, Math.PI * 2);
      ctx.fillStyle = bgGlow;
      ctx.fill();

      // -------------------------------------------------------------
      // 2. ROTATING OUTER RADAR & BEARING CALIPER RINGS
      // -------------------------------------------------------------
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotationY * 0.25);

      // Outer dashed compass ring
      ctx.beginPath();
      ctx.arc(0, 0, 162, 0, Math.PI * 2);
      ctx.strokeStyle = state === 'alert' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 7]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 48 High-precision radar tick marks
      for (let i = 0; i < 48; i++) {
        const rad = (i * 7.5 * Math.PI) / 180;
        const isMajor = i % 12 === 0;
        const isSemi = i % 4 === 0;
        const len = isMajor ? 12 : isSemi ? 7 : 3;
        const r1 = 156;
        const r2 = r1 - len;

        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
        ctx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2);
        ctx.strokeStyle = isMajor ? '#00ffff' : isSemi ? 'rgba(56, 189, 248, 0.7)' : 'rgba(0, 191, 255, 0.25)';
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.stroke();
      }
      ctx.restore();

      // Counter-rotating segmented targeting brackets
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-rotationY * 0.5);

      for (let arcIndex = 0; arcIndex < 4; arcIndex++) {
        const start = (arcIndex * Math.PI) / 2 + 0.18;
        const end = ((arcIndex + 1) * Math.PI) / 2 - 0.18;
        ctx.beginPath();
        ctx.arc(0, 0, 138, start, end);
        ctx.strokeStyle = state === 'alert' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(0, 216, 255, 0.65)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ffff';
        ctx.stroke();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 3. 3D WIREFRAME GLOBE LATITUDE CIRCLES (PARALLELS)
      // -------------------------------------------------------------
      const latitudes = [-65, -45, -25, 0, 25, 45, 65];
      latitudes.forEach((latDeg) => {
        const latRad = (latDeg * Math.PI) / 180;
        const rLat = dynamicRadius * Math.cos(latRad);
        const yLat = dynamicRadius * Math.sin(latRad);
        const segments = 36;

        ctx.beginPath();
        let started = false;

        for (let s = 0; s <= segments; s++) {
          const lonRad = (s / segments) * Math.PI * 2;
          const px = rLat * Math.cos(lonRad);
          const pz = rLat * Math.sin(lonRad);

          const proj = project3D(px, yLat, pz);

          if (!started) {
            ctx.moveTo(proj.px, proj.py);
            started = true;
          } else {
            ctx.lineTo(proj.px, proj.py);
          }
        }

        const isEquator = latDeg === 0;
        ctx.strokeStyle = isEquator
          ? (state === 'alert' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(0, 255, 255, 0.85)')
          : (state === 'alert' ? 'rgba(239, 68, 68, 0.28)' : 'rgba(0, 191, 255, 0.32)');
        ctx.lineWidth = isEquator ? 2 : 1;
        if (isEquator) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ffff';
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      });

      // -------------------------------------------------------------
      // 4. 3D WIREFRAME GLOBE LONGITUDE MERIDIANS
      // -------------------------------------------------------------
      const meridianCount = 10;
      for (let m = 0; m < meridianCount; m++) {
        const meridianLon = (m / meridianCount) * Math.PI;
        const segments = 32;

        ctx.beginPath();
        let started = false;

        for (let s = 0; s <= segments; s++) {
          const latRad = -Math.PI / 2 + (s / segments) * Math.PI;
          const px = dynamicRadius * Math.cos(latRad) * Math.cos(meridianLon);
          const py = dynamicRadius * Math.sin(latRad);
          const pz = dynamicRadius * Math.cos(latRad) * Math.sin(meridianLon);

          const proj = project3D(px, py, pz);

          if (!started) {
            ctx.moveTo(proj.px, proj.py);
            started = true;
          } else {
            ctx.lineTo(proj.px, proj.py);
          }
        }

        ctx.strokeStyle = state === 'alert' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(0, 216, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 5. 3D FIBONACCI SURFACE DATA NODES (CYBER DOTS)
      // -------------------------------------------------------------
      const projectedNodes: Array<{ px: number; py: number; pz: number; isFront: boolean; color: string }> = [];

      baseNodes.forEach((node) => {
        const proj = project3D(node.x, node.y, node.z);
        projectedNodes.push({
          px: proj.px,
          py: proj.py,
          pz: proj.pz,
          isFront: proj.isFront,
          color: node.baseColor
        });

        // Calculate opacity and radius based on 3D depth (Z-buffer effect)
        const depthFactor = (proj.pz + sphereRadius) / (sphereRadius * 2);
        const alpha = Math.max(0.12, Math.min(1.0, depthFactor * (proj.isFront ? 0.95 : 0.25)));
        const pointRadius = proj.isFront ? (1.5 + depthFactor * 1.5) : 1.0;

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pointRadius, 0, Math.PI * 2);

        if (proj.isFront) {
          ctx.fillStyle = state === 'alert' ? `rgba(239, 68, 68, ${alpha})` : `${node.baseColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = state === 'alert' ? '#ef4444' : '#00ffff';
        } else {
          ctx.fillStyle = `rgba(14, 116, 144, ${alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      // -------------------------------------------------------------
      // 6. SURFACE LASER DATA ARCS (TRAVELING PHOTON PACKETS)
      // -------------------------------------------------------------
      dataArcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed * speedMultiplier) % 1.0;
        const n1 = projectedNodes[arc.from];
        const n2 = projectedNodes[arc.to];

        if (n1 && n2 && (n1.isFront || n2.isFront)) {
          // Draw connecting arc line
          ctx.beginPath();
          ctx.moveTo(n1.px, n1.py);
          // Curve slightly toward center or outwards
          const midX = (n1.px + n2.px) / 2 + (cx - (n1.px + n2.px) / 2) * -0.15;
          const midY = (n1.py + n2.py) / 2 + (cy - (n1.py + n2.py) / 2) * -0.15;
          ctx.quadraticCurveTo(midX, midY, n2.px, n2.py);
          ctx.strokeStyle = state === 'alert' ? 'rgba(239, 68, 68, 0.45)' : 'rgba(0, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Traveling photon packet along the arc
          const t = arc.progress;
          const packetX = (1 - t) * (1 - t) * n1.px + 2 * (1 - t) * t * midX + t * t * n2.px;
          const packetY = (1 - t) * (1 - t) * n1.py + 2 * (1 - t) * t * midY + t * t * n2.py;

          ctx.beginPath();
          ctx.arc(packetX, packetY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ffff';
          ctx.fill();
        }
      });

      // -------------------------------------------------------------
      // 7. QUANTUM CORE & FREQUENCY EQUALIZER RIPPLES
      // -------------------------------------------------------------
      const coreGradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, 38);
      if (state === 'alert') {
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.3, 'rgba(239, 68, 68, 0.8)');
        coreGradient.addColorStop(1, 'rgba(220, 38, 38, 0)');
      } else if (state === 'speaking') {
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGradient.addColorStop(0.35, 'rgba(0, 255, 255, 0.85)');
        coreGradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
      } else {
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        coreGradient.addColorStop(0.4, 'rgba(0, 216, 255, 0.65)');
        coreGradient.addColorStop(1, 'rgba(3, 105, 161, 0)');
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 32 + Math.sin(pulse * 2) * 3, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = 18;
      ctx.shadowColor = state === 'alert' ? '#ef4444' : '#00ffff';
      ctx.fill();

      // Audio frequency wave spikes (radiating when speaking or listening)
      if (state === 'speaking' || state === 'listening') {
        ctx.save();
        ctx.translate(cx, cy);
        const waveCount = 32;
        for (let w = 0; w < waveCount; w++) {
          const waveAngle = (w / waveCount) * Math.PI * 2 + rotationY;
          const amp = Math.sin(pulse * 3 + w * 0.9) * 14 + 10;
          const rInner = dynamicRadius + 4;
          const rOuter = rInner + amp;

          ctx.beginPath();
          ctx.moveTo(Math.cos(waveAngle) * rInner, Math.sin(waveAngle) * rInner);
          ctx.lineTo(Math.cos(waveAngle) * rOuter, Math.sin(waveAngle) * rOuter);
          ctx.strokeStyle = state === 'speaking' ? 'rgba(0, 255, 255, 0.85)' : 'rgba(56, 189, 248, 0.85)';
          ctx.lineWidth = 2;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00ffff';
          ctx.stroke();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [state, audioActive]);

  const getStateLabel = () => {
    switch (state) {
      case 'listening': return 'AUDIO MATRIX ACTIVE // LISTENING TO BOSS';
      case 'speaking': return 'VOICE SYNTHESIS ACTIVE // DUAL OUTPUT';
      case 'processing': return 'NEURAL CORE BUSY // REASONING MATRIX';
      case 'alert': return 'HIGH-RISK WARNING // CONFIRMATION REQUIRED';
      default: return 'FRIDAY KERNEL ONLINE // FULL PC ACCESS';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none group w-full max-w-lg mx-auto">
      {/* Outer Cyan Halo Aura */}
      <div 
        className={`absolute -inset-4 rounded-full filter blur-3xl transition-all duration-700 pointer-events-none ${
          state === 'listening' 
            ? 'bg-sky-500/35' 
            : state === 'speaking' 
            ? 'bg-cyan-400/40' 
            : state === 'alert'
            ? 'bg-rose-500/45'
            : 'bg-cyan-600/20'
        }`} 
      />

      {/* Holographic 3D Globe Frame */}
      <div 
        onClick={onClick}
        className="relative cursor-pointer transition-transform duration-300 active:scale-95"
        title="Click to toggle Voice Input / Wake FRIDAY"
      >
        <canvas 
          ref={canvasRef} 
          width={360} 
          height={360} 
          className="relative z-10 w-[270px] h-[270px] sm:w-[310px] sm:h-[310px] md:w-[340px] md:h-[340px]"
        />

        {/* Center Holographic Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-400/60 backdrop-blur-md mb-1 shadow-lg shadow-cyan-950/60">
            {state === 'listening' ? (
              <Mic className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            ) : state === 'speaking' ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />
            ) : state === 'alert' ? (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            )}
            <span className="font-mono-hud text-[11px] font-bold text-cyan-200 tracking-wider">
              {state.toUpperCase()}
            </span>
          </div>
          <span className="font-orbitron text-xs font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(0,255,255,0.9)]">
            FRIDAY
          </span>
          <span className="text-[9px] font-mono-hud text-cyan-300/80 tracking-wider">
            AI EXECUTIVE HUD
          </span>
        </div>
      </div>

      {/* State Status Banner below Globe */}
      <div className="mt-1 text-center z-20">
        <div className="font-chakra text-xs sm:text-sm font-bold tracking-wider text-cyan-300 text-glow-cyan">
          {getStateLabel()}
        </div>
      </div>

      {/* LIVE VOICE SUBTITLES & SPOKEN TEXT WRITTEN DISPLAY (Explicit User Request) */}
      <div className="mt-3 w-full px-3 z-20">
        <div className="relative rounded-xl bg-slate-950/90 border border-cyan-500/40 p-3 backdrop-blur-md shadow-[0_0_16px_rgba(0,255,255,0.15)] transition-all">
          {/* Header row with Audio stream indicator */}
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-1.5 mb-2">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${state === 'speaking' ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="font-mono-hud text-[10px] font-bold text-cyan-300 tracking-wider">
                FRIDAY AUDIO SYNTHESIS // LIVE VOICE TRANSCRIPTION
              </span>
            </div>
            <span className="font-mono-hud text-[10px] text-slate-400">
              OPERATOR: <span className="text-cyan-300 font-bold">{bossName}</span>
            </span>
          </div>

          {/* Written spoken text */}
          <div className="flex items-start space-x-2.5 min-h-[44px]">
            <div className="shrink-0 mt-0.5">
              <Volume2 className={`w-4 h-4 ${state === 'speaking' ? 'text-cyan-300 animate-pulse' : 'text-slate-500'}`} />
            </div>
            <div className="flex-1">
              <p className="font-rajdhani text-sm sm:text-base font-semibold text-slate-100 leading-snug tracking-wide">
                "{displayedSubtitle}"
              </p>
              {state === 'speaking' && (
                <div className="flex items-center space-x-1 mt-1">
                  <span className="h-2 w-1 bg-cyan-400 animate-[bounce_0.6s_infinite_100ms] rounded-full" />
                  <span className="h-3 w-1 bg-cyan-300 animate-[bounce_0.6s_infinite_200ms] rounded-full" />
                  <span className="h-4 w-1 bg-cyan-200 animate-[bounce_0.6s_infinite_300ms] rounded-full" />
                  <span className="h-3 w-1 bg-cyan-300 animate-[bounce_0.6s_infinite_400ms] rounded-full" />
                  <span className="h-2 w-1 bg-cyan-400 animate-[bounce_0.6s_infinite_500ms] rounded-full" />
                  <span className="text-[10px] font-mono-hud text-cyan-400/80 ml-2">Transmitting TTS voice stream...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
