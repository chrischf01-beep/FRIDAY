import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';

export interface GeneratedWebsiteBundle {
  projectName: string;
  category: string;
  description: string;
  files: {
    'index.html': string;
    'style.css': string;
    'script.js': string;
    'README.md': string;
    [key: string]: string;
  };
}

export function generateWebsiteBundle(rawPrompt: string, bossName: string): GeneratedWebsiteBundle {
  const prompt = rawPrompt.toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

  // 1. SaaS / Analytics / Dashboard
  if (prompt.includes('saas') || prompt.includes('dashboard') || prompt.includes('analytics') || prompt.includes('cloud')) {
    const projName = `nexus_cloud_saas_${timestamp}`;
    return {
      projectName: projName,
      category: 'SaaS / Cloud Platform',
      description: 'Autonomous cloud operations dashboard with live metric charts, dynamic pricing calculator, and system log streamer.',
      files: {
        'index.html': `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NexusAI Cloud // Architecture for ${bossName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans'] antialiased selection:bg-cyan-500 selection:text-black min-h-screen flex flex-col">
  
  <!-- Navigation Bar -->
  <nav class="sticky top-0 z-50 border-b border-cyan-950/60 bg-slate-950/80 backdrop-blur-xl px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          N
        </div>
        <span class="font-extrabold tracking-tight text-lg text-cyan-400 font-['JetBrains_Mono']">NEXUS.AI</span>
        <span class="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">PROD-READY</span>
      </div>

      <div class="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
        <a href="#features" class="hover:text-cyan-400 transition-colors">Features</a>
        <a href="#metrics" class="hover:text-cyan-400 transition-colors">Telemetry</a>
        <a href="#pricing" class="hover:text-cyan-400 transition-colors">Pricing</a>
        <a href="#logs" class="hover:text-cyan-400 transition-colors">Live Logs</a>
      </div>

      <div class="flex items-center space-x-4">
        <button onclick="toggleDeployModal()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer">
          Deploy Cluster
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="relative pt-20 pb-16 px-6 max-w-6xl mx-auto text-center space-y-6">
    <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
      <span>Operating for ${bossName} // 99.99% Uptime SLA</span>
    </div>

    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
      Autonomous Cloud Infrastructure <br/>
      <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        Engineered for Next-Gen Scale
      </span>
    </h1>

    <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
      Deploy microservices, serverless neural workers, and distributed databases with zero config. Real-time telemetry, auto-healing, and sub-12ms global latency.
    </p>

    <!-- Real-time Stats Strip -->
    <div id="metrics" class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
        <span class="text-xs text-slate-500 font-mono">GLOBAL LATENCY</span>
        <div class="text-2xl font-bold text-cyan-400 font-['JetBrains_Mono']">8.4 ms</div>
        <span class="text-[11px] text-emerald-400">▲ 99.8% optimized</span>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
        <span class="text-xs text-slate-500 font-mono">ACTIVE CLUSTERS</span>
        <div class="text-2xl font-bold text-white font-['JetBrains_Mono']">1,842</div>
        <span class="text-[11px] text-cyan-400">Worldwide nodes</span>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
        <span class="text-xs text-slate-500 font-mono">THROUGHPUT</span>
        <div class="text-2xl font-bold text-indigo-400 font-['JetBrains_Mono']">480k req/s</div>
        <span class="text-[11px] text-emerald-400">Stable ingress</span>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
        <span class="text-xs text-slate-500 font-mono">SECURITY PROTOCOL</span>
        <div class="text-2xl font-bold text-emerald-400 font-['JetBrains_Mono']">ENCRYPTED</div>
        <span class="text-[11px] text-slate-400">mTLS + Zero-Trust</span>
      </div>
    </div>
  </header>

  <!-- Interactive Live Logs Terminal -->
  <section id="logs" class="max-w-5xl mx-auto px-6 py-12 w-full">
    <div class="rounded-2xl bg-slate-900 border border-cyan-900/40 overflow-hidden shadow-2xl">
      <div class="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full bg-rose-500"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span class="ml-2 font-bold text-slate-300">cluster-telemetry.log</span>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="clearLogs()" class="hover:text-cyan-400 transition-colors">Clear</button>
          <span id="log-status" class="text-emerald-400 flex items-center space-x-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>STREAMING</span>
          </span>
        </div>
      </div>
      <div id="log-terminal" class="p-4 h-48 overflow-y-auto font-mono text-xs text-cyan-300/90 space-y-1 bg-black/40">
        <div>[07:30:12] [INFRA] Initializing cluster nexus-fra-1 for operator ${bossName}...</div>
        <div>[07:30:14] [SECURITY] Zero-trust mutual TLS verified with sha256 finger-print.</div>
        <div>[07:30:16] [LOAD_BALANCER] Routing table synchronized across 12 edge locations.</div>
      </div>
    </div>
  </section>

  <!-- Interactive Dynamic Pricing -->
  <section id="pricing" class="max-w-6xl mx-auto px-6 py-16 w-full text-center">
    <h2 class="text-3xl font-extrabold text-white">Transparent, Scalable Pricing</h2>
    <p class="text-sm text-slate-400 mt-2">Scale seamlessly from hobby prototypes to enterprise workloads.</p>

    <!-- Billing Switch -->
    <div class="flex items-center justify-center space-x-3 mt-8">
      <span id="monthly-label" class="text-sm font-semibold text-cyan-400">Monthly</span>
      <button onclick="toggleBilling()" id="billing-toggle" class="w-12 h-6 rounded-full bg-cyan-900 border border-cyan-500 p-0.5 transition-colors relative">
        <div id="billing-dot" class="w-5 h-5 rounded-full bg-cyan-400 transition-transform"></div>
      </button>
      <span id="annual-label" class="text-sm font-semibold text-slate-400">Annual <span class="text-xs text-emerald-400 font-mono">(-20%)</span></span>
    </div>

    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 text-left">
      <!-- Starter -->
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div class="font-bold text-lg text-white">Developer</div>
        <div class="text-3xl font-extrabold text-cyan-400"><span id="price-dev">$19</span><span class="text-xs text-slate-400 font-normal"> / mo</span></div>
        <p class="text-xs text-slate-400">Ideal for personal toolkits and side projects.</p>
        <ul class="text-xs text-slate-300 space-y-2 pt-4 border-t border-slate-800">
          <li>✔ 5 Dedicated Microservices</li>
          <li>✔ 50GB Fast NVMe Storage</li>
          <li>✔ Community Support</li>
        </ul>
        <button onclick="selectPlan('Developer')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-all">Select Tier</button>
      </div>

      <!-- Pro -->
      <div class="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/60 to-slate-900 border-2 border-cyan-500 space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
        <div class="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">Most Popular</div>
        <div class="font-bold text-lg text-white">Professional</div>
        <div class="text-3xl font-extrabold text-cyan-300"><span id="price-pro">$79</span><span class="text-xs text-slate-400 font-normal"> / mo</span></div>
        <p class="text-xs text-slate-400">For fast-growing SaaS startups and teams.</p>
        <ul class="text-xs text-slate-300 space-y-2 pt-4 border-t border-slate-800">
          <li>✔ Unlimited Microservices</li>
          <li>✔ 500GB High-IOPS Storage</li>
          <li>✔ 99.99% Guaranteed SLA</li>
          <li>✔ 24/7 Priority Support</li>
        </ul>
        <button onclick="selectPlan('Professional')" class="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-lg transition-all">Get Started</button>
      </div>

      <!-- Enterprise -->
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div class="font-bold text-lg text-white">Enterprise</div>
        <div class="text-3xl font-extrabold text-indigo-400"><span id="price-ent">$249</span><span class="text-xs text-slate-400 font-normal"> / mo</span></div>
        <p class="text-xs text-slate-400">Custom dedicated clusters with custom VPC.</p>
        <ul class="text-xs text-slate-300 space-y-2 pt-4 border-t border-slate-800">
          <li>✔ Custom Dedicated Hardware</li>
          <li>✔ Unlimited Storage & Bandwidth</li>
          <li>✔ Dedicated Account Architect</li>
        </ul>
        <button onclick="selectPlan('Enterprise')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs transition-all">Contact Sales</button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="mt-auto border-t border-slate-900 py-8 text-center text-xs text-slate-500">
    <p>Engineered by FRIDAY AI for ${bossName} &bull; Visual Studio Code Ready</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
        'style.css': `/* Custom Design Rules for Nexus SaaS */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.glow-box {
  animation: pulseGlow 4s infinite ease-in-out;
}
`,
        'script.js': `// Nexus SaaS Interactive Scripts
let isAnnual = false;

function toggleBilling() {
  isAnnual = !isAnnual;
  const dot = document.getElementById('billing-dot');
  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');

  if (isAnnual) {
    dot.style.transform = 'translateX(24px)';
    monthlyLabel.classList.replace('text-cyan-400', 'text-slate-400');
    annualLabel.classList.replace('text-slate-400', 'text-cyan-400');
    document.getElementById('price-dev').innerText = '$15';
    document.getElementById('price-pro').innerText = '$63';
    document.getElementById('price-ent').innerText = '$199';
  } else {
    dot.style.transform = 'translateX(0px)';
    monthlyLabel.classList.replace('text-slate-400', 'text-cyan-400');
    annualLabel.classList.replace('text-cyan-400', 'text-slate-400');
    document.getElementById('price-dev').innerText = '$19';
    document.getElementById('price-pro').innerText = '$79';
    document.getElementById('price-ent').innerText = '$249';
  }
}

function selectPlan(tier) {
  alert("Greetings, Boss Chris! You selected the " + tier + " tier. Configure your credentials in VS Code to deploy.");
}

function clearLogs() {
  document.getElementById('log-terminal').innerHTML = '<div class="text-slate-500">[Logs cleared by operator]</div>';
}

// Stream simulated telemetry logs
const sampleLogs = [
  "[NET] Ingress load: 48,290 req/min smoothly distributed across region eu-west.",
  "[AUTH] JWT Session validation success for 1,200 concurrent users.",
  "[DB] Read replica sync latency: 1.2ms (healthy).",
  "[AUTO-SCALE] Node cluster autoscaled +2 pods to handle compute surge."
];

setInterval(() => {
  const terminal = document.getElementById('log-terminal');
  if (terminal) {
    const time = new Date().toLocaleTimeString();
    const randomLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
    const div = document.createElement('div');
    div.innerText = "[" + time + "] " + randomLog;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }
}, 4000);
`,
        'README.md': `# NexusAI Cloud SaaS Project
**Author:** ${bossName}
**Generated by:** FRIDAY AI (Mark-VI) for Visual Studio Code

### Quick Start in VS Code:
1. Open this folder in VS Code:
   \`code .\`
2. Launch Live Server:
   Right-click \`index.html\` -> **Open with Live Server** (or hit Go Live on status bar).
3. Inspect and edit files seamlessly!
`
      }
    };
  }

  // 2. Developer Portfolio / Resume / Personal Showcase
  if (prompt.includes('portfolio') || prompt.includes('developer') || prompt.includes('resume') || prompt.includes('engineer') || prompt.includes('profile')) {
    const projName = `chris_dev_portfolio_${timestamp}`;
    return {
      projectName: projName,
      category: 'Developer Portfolio',
      description: 'Ultra-modern software engineer portfolio with interactive terminal, live skills meters, project showcase, and contact modal.',
      files: {
        'index.html': `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bossName} // Full-Stack Software Engineer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans'] min-h-screen selection:bg-cyan-400 selection:text-slate-950">

  <!-- Nav -->
  <nav class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="#" class="text-cyan-400 font-extrabold text-lg font-['JetBrains_Mono'] flex items-center space-x-2">
        <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
        <span>${bossName.toUpperCase()}.DEV</span>
      </a>
      <div class="hidden sm:flex items-center space-x-6 text-sm font-medium text-slate-300">
        <a href="#about" class="hover:text-cyan-400 transition-colors">About</a>
        <a href="#projects" class="hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#skills" class="hover:text-cyan-400 transition-colors">Skills</a>
        <a href="#contact" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all">Contact</a>
      </div>
    </div>
  </nav>

  <!-- Hero & Terminal -->
  <header class="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center space-y-6">
    <div class="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
      Available for High-Impact Software Engineering
    </div>
    <h1 class="text-5xl sm:text-7xl font-extrabold tracking-tight">
      Hi, I'm <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">${bossName}</span>
    </h1>
    <p class="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
      Full-Stack Software Engineer specializing in modern web architectures, scalable backend systems, and AI-driven workflow automation.
    </p>

    <!-- Simulated Terminal -->
    <div class="max-w-xl mx-auto mt-8 rounded-xl bg-slate-900 border border-slate-800 text-left overflow-hidden shadow-2xl">
      <div class="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span class="text-xs font-mono text-slate-500 ml-2">bash - 80x24</span>
      </div>
      <div class="p-4 font-['JetBrains_Mono'] text-xs text-slate-300 space-y-2">
        <div><span class="text-cyan-400">chris@laptop:~$</span> whoami</div>
        <div class="text-slate-400">> Software Architect // Systems & Full-Stack</div>
        <div><span class="text-cyan-400">chris@laptop:~$</span> cat core_stack.json</div>
        <div class="text-emerald-400">{ "languages": ["TypeScript", "Python", "Go", "Rust"], "frameworks": ["React", "Node", "Tailwind", "Next.js"] }</div>
      </div>
    </div>
  </header>

  <!-- Projects Grid -->
  <section id="projects" class="max-w-6xl mx-auto px-6 py-16">
    <h2 class="text-3xl font-extrabold text-white mb-8 flex items-center space-x-3">
      <span class="w-2 h-7 bg-cyan-400 rounded-sm"></span>
      <span>Featured Projects</span>
    </h2>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
        <div class="h-40 rounded-xl bg-gradient-to-tr from-cyan-950 to-blue-900/60 mb-4 flex items-center justify-center font-mono text-cyan-300 font-bold">
          [AI KERNEL ENGINE]
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">FRIDAY Windows 10 Core</h3>
        <p class="text-xs text-slate-400 mt-2">Autonomous desktop digital twin with real speech synthesis, cursor robotics, and polymath engine.</p>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all group">
        <div class="h-40 rounded-xl bg-gradient-to-tr from-indigo-950 to-purple-900/60 mb-4 flex items-center justify-center font-mono text-indigo-300 font-bold">
          [FINTECH PLATFORM]
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Autonomous Trading Terminal</h3>
        <p class="text-xs text-slate-400 mt-2">High-frequency algorithmic paper trading sandbox with hard stop-loss risk controls.</p>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all group">
        <div class="h-40 rounded-xl bg-gradient-to-tr from-emerald-950 to-teal-900/60 mb-4 flex items-center justify-center font-mono text-emerald-300 font-bold">
          [WEB STUDIO]
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">VS Code Web Architect</h3>
        <p class="text-xs text-slate-400 mt-2">Instant automated code generator and project scaffolder for rapid production deployment.</p>
      </div>
    </div>
  </section>

  <!-- Contact Form -->
  <section id="contact" class="max-w-2xl mx-auto px-6 py-16 text-center">
    <h2 class="text-3xl font-extrabold text-white">Let's Build Something Great</h2>
    <p class="text-sm text-slate-400 mt-2">Have a technical project or inquiry? Send a direct dispatch.</p>
    <form onsubmit="handleContactSubmit(event)" class="mt-8 space-y-4 text-left">
      <div>
        <label class="text-xs text-slate-400 font-mono">YOUR NAME</label>
        <input type="text" required placeholder="Jane Doe" class="w-full mt-1 p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:border-cyan-400 focus:outline-none">
      </div>
      <div>
        <label class="text-xs text-slate-400 font-mono">YOUR MESSAGE</label>
        <textarea required rows="4" placeholder="Let's build a modern app..." class="w-full mt-1 p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:border-cyan-400 focus:outline-none resize-none"></textarea>
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all">
        Send Dispatch
      </button>
    </form>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
    <p>&copy; 2026 ${bossName}. Architected with FRIDAY in Visual Studio Code.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
        'style.css': `/* Portfolio Custom Theme */
html { scroll-behavior: smooth; }
`,
        'script.js': `function handleContactSubmit(e) {
  e.preventDefault();
  alert("Message dispatched to ${bossName}! Thank you for reaching out.");
}
`,
        'README.md': `# ${bossName}'s Portfolio Project
Built with FRIDAY AI for Visual Studio Code.
Open in VS Code: \`code .\`
`
      }
    };
  }

  // 3. E-Commerce / Store / Marketplace
  if (prompt.includes('ecommerce') || prompt.includes('store') || prompt.includes('shop') || prompt.includes('cart')) {
    const projName = `cybervault_store_${timestamp}`;
    return {
      projectName: projName,
      category: 'E-Commerce Storefront',
      description: 'Modern cyber gear storefront with interactive cart drawer, product modals, and dynamic checkout calculation.',
      files: {
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CyberVault Store // Curated for ${bossName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
  <!-- Nav -->
  <nav class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
    <div class="font-extrabold text-cyan-400 text-xl tracking-wider">CYBERVAULT</div>
    <button onclick="toggleCartDrawer()" class="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold text-sm flex items-center space-x-2 cursor-pointer hover:bg-slate-800">
      <span>🛒 Cart</span>
      <span id="cart-counter" class="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-xs flex items-center justify-center font-bold">0</span>
    </button>
  </nav>

  <!-- Hero -->
  <header class="py-12 px-6 text-center max-w-4xl mx-auto space-y-4">
    <h1 class="text-4xl sm:text-6xl font-extrabold text-white">Next-Gen Cybernetic Gear</h1>
    <p class="text-slate-400 text-sm">Ultra-high-performance developer hardware and neural accessories.</p>
  </header>

  <!-- Product Grid -->
  <main class="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
      <div class="h-44 rounded-xl bg-gradient-to-tr from-cyan-900/60 to-slate-800 flex items-center justify-center text-4xl">💻</div>
      <div>
        <h3 class="font-bold text-white text-lg">Quantum DevStation</h3>
        <p class="text-xs text-slate-400 mt-1">128GB Unified Memory, 24-Core Neural Engine.</p>
      </div>
      <div class="flex items-center justify-between pt-2">
        <span class="text-cyan-400 font-bold text-lg">$2,499</span>
        <button onclick="addToCart('Quantum DevStation', 2499)" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">Add to Cart</button>
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
      <div class="h-44 rounded-xl bg-gradient-to-tr from-indigo-900/60 to-slate-800 flex items-center justify-center text-4xl">🎧</div>
      <div>
        <h3 class="font-bold text-white text-lg">Neural Acoustic Headset</h3>
        <p class="text-xs text-slate-400 mt-1">Active acoustic nullification & binaural focus engine.</p>
      </div>
      <div class="flex items-center justify-between pt-2">
        <span class="text-cyan-400 font-bold text-lg">$349</span>
        <button onclick="addToCart('Neural Acoustic Headset', 349)" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">Add to Cart</button>
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
      <div class="h-44 rounded-xl bg-gradient-to-tr from-emerald-900/60 to-slate-800 flex items-center justify-center text-4xl">⌨️</div>
      <div>
        <h3 class="font-bold text-white text-lg">CyberKey Mechanical</h3>
        <p class="text-xs text-slate-400 mt-1">Split ergonomic chassis with hot-swappable hall sensors.</p>
      </div>
      <div class="flex items-center justify-between pt-2">
        <span class="text-cyan-400 font-bold text-lg">$189</span>
        <button onclick="addToCart('CyberKey Mechanical', 189)" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">Add to Cart</button>
      </div>
    </div>
  </main>

  <!-- Cart Modal Drawer -->
  <div id="cart-drawer" class="fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-cyan-500/40 shadow-2xl p-6 hidden flex-col z-50">
    <div class="flex items-center justify-between border-b border-slate-800 pb-4">
      <h3 class="font-bold text-cyan-300">Your Cart</h3>
      <button onclick="toggleCartDrawer()" class="text-slate-400 hover:text-white">✕</button>
    </div>
    <div id="cart-items" class="flex-1 overflow-y-auto py-4 space-y-3 text-xs text-slate-300">
      <p class="text-slate-500">Cart is empty.</p>
    </div>
    <div class="border-t border-slate-800 pt-4 space-y-3">
      <div class="flex justify-between font-bold text-white">
        <span>Total:</span>
        <span id="cart-total" class="text-cyan-400">$0</span>
      </div>
      <button onclick="alert('Ready to configure Stripe or PayPal in VS Code for Boss Chris!')" class="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs">Checkout</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
        'style.css': `/* E-commerce Storefront Styles */`,
        'script.js': `let cart = [];
let total = 0;

function addToCart(title, price) {
  cart.push({ title, price });
  total += price;
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-counter').innerText = cart.length;
  document.getElementById('cart-total').innerText = '$' + total;
  const itemsContainer = document.getElementById('cart-items');
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="text-slate-500">Cart is empty.</p>';
  } else {
    itemsContainer.innerHTML = cart.map(item => \`<div class="flex justify-between p-2 rounded bg-slate-950 border border-slate-800"><span>\${item.title}</span><span class="text-cyan-400 font-bold">$\${item.price}</span></div>\`).join('');
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.toggle('hidden');
  drawer.classList.toggle('flex');
}
`,
        'README.md': `# CyberVault Storefront
Built with FRIDAY AI for Boss Chris in Visual Studio Code.
`
      }
    };
  }

  // 4. General / Custom Fallback Website
  const projName = `friday_web_project_${timestamp}`;
  return {
    projectName: projName,
    category: 'Custom Web Application',
    description: `Responsive modern web application architected for prompt: "${rawPrompt}"`,
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bossName}'s Custom Application</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 flex flex-col items-center justify-center font-sans">
  <div class="max-w-2xl w-full p-8 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl text-center space-y-6">
    <div class="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
      ARCHITECTED BY FRIDAY FOR ${bossName.toUpperCase()}
    </div>
    <h1 class="text-4xl font-extrabold text-cyan-400">${bossName}'s Web Studio</h1>
    <p class="text-slate-300 text-sm leading-relaxed">
      Custom application generated for: <span class="text-white font-semibold">"${rawPrompt}"</span>.
    </p>
    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs text-slate-400 space-y-1">
      <div>Project: ${projName}</div>
      <div>Platform: Windows 10 // Visual Studio Code</div>
      <div>Status: Ready for customization</div>
    </div>
    <div class="flex items-center justify-center space-x-4 pt-2">
      <button onclick="alert('Greetings, ${bossName}! Modify index.html, style.css, and script.js in VS Code.')" class="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all">
        Launch Action
      </button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      'style.css': `/* Custom Application Styles */`,
      'script.js': `console.log("Custom app loaded for ${bossName}.");`,
      'README.md': `# Custom Web Application
Generated by FRIDAY AI for ${bossName}.
Launch in VS Code: \`code .\`
`
    }
  };
}

export function saveProjectToDisk(projectName: string, files: Record<string, string>, bossName: string, openInVSCode = true) {
  const sanitizedName = projectName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const isWin = process.platform === 'win32';
  const homeDir = os.homedir();
  const baseDir = isWin && fs.existsSync(path.join(homeDir, 'Desktop'))
    ? path.join(homeDir, 'Desktop', 'FRIDAY_Websites')
    : path.join(process.cwd(), 'generated_websites');

  const projectDir = path.join(baseDir, sanitizedName);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  for (const [filename, content] of Object.entries(files)) {
    if (typeof content === 'string') {
      const filePath = path.join(projectDir, filename);
      const dirOfFile = path.dirname(filePath);
      if (!fs.existsSync(dirOfFile)) {
        fs.mkdirSync(dirOfFile, { recursive: true });
      }
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }

  // Ensure standard VS Code settings exist
  const vscodeDir = path.join(projectDir, '.vscode');
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(vscodeDir, 'settings.json'),
    JSON.stringify({ 'liveServer.settings.port': 5500, 'editor.formatOnSave': true }, null, 2),
    'utf-8'
  );

  let launched = false;
  if (openInVSCode) {
    exec(`code "${projectDir}"`, (err) => {
      if (err) {
        console.log(`[VS CODE LAUNCH NOTICE] 'code' command not in PATH: ${err.message}`);
      } else {
        console.log(`[VS CODE LAUNCH] Successfully invoked VS Code on ${projectDir}`);
      }
    });
    launched = true;
  }

  return { projectDir, launched, isWin };
}
