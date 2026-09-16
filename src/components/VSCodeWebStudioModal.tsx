import React, { useState } from 'react';
import { X, Code2, Play, Download, ExternalLink, Check, Copy, Sparkles, Laptop, FileCode, Layers, Monitor } from 'lucide-react';

interface VSCodeWebStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  bossName: string;
  onSendToChat?: (prompt: string) => void;
}

interface WebsiteProject {
  id: string;
  name: string;
  category: string;
  description: string;
  html: string;
  css: string;
  js: string;
}

const DEFAULT_PROJECTS: WebsiteProject[] = [
  {
    id: 'portfolio',
    name: 'Modern Creative Portfolio',
    category: 'Portfolio / Personal',
    description: 'A responsive personal portfolio with hero section, project cards, and contact form.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chris - Creative Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
  <!-- Navbar -->
  <nav class="border-b border-cyan-900/40 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
    <div class="flex items-center space-x-2">
      <div class="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
      <span class="font-bold text-lg tracking-wider text-cyan-300">CHRIS.DEV</span>
    </div>
    <div class="flex items-center space-x-6 text-sm font-medium">
      <a href="#work" class="hover:text-cyan-400 transition-colors">Work</a>
      <a href="#about" class="hover:text-cyan-400 transition-colors">About</a>
      <a href="#contact" class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all">Get in Touch</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="max-w-5xl mx-auto px-6 py-20 text-center space-y-6">
    <span class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
      Built for Windows 10 & VS Code
    </span>
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
      Crafting Next-Generation Digital Experiences
    </h1>
    <p class="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
      Welcome to Boss Chris's digital showcase. Architected and generated with FRIDAY AI for high performance, accessibility, and visual elegance.
    </p>
    <div class="flex items-center justify-center space-x-4 pt-4">
      <button onclick="showDemoAlert()" class="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all">
        Explore Showcase
      </button>
      <a href="#work" class="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-800/60 text-cyan-300 font-semibold transition-all">
        View Projects
      </a>
    </div>
  </header>

  <!-- Showcase Grid -->
  <section id="work" class="max-w-6xl mx-auto px-6 py-12">
    <h2 class="text-2xl font-bold text-cyan-300 mb-8 flex items-center space-x-2">
      <span class="w-2 h-6 bg-cyan-400 rounded-sm"></span>
      <span>Featured Projects</span>
    </h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-900/90 border border-cyan-900/50 hover:border-cyan-500/50 transition-all group">
        <div class="h-36 rounded-xl bg-gradient-to-tr from-cyan-900/60 to-blue-900/40 mb-4 flex items-center justify-center">
          <span class="text-cyan-400 font-mono text-sm">[PROJECT_ALPHA]</span>
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-cyan-300">FRIDAY Polymath Engine</h3>
        <p class="text-sm text-slate-400 mt-2">Study, science, and world knowledge synthesis suite for Windows 10.</p>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/90 border border-cyan-900/50 hover:border-cyan-500/50 transition-all group">
        <div class="h-36 rounded-xl bg-gradient-to-tr from-indigo-900/60 to-purple-900/40 mb-4 flex items-center justify-center">
          <span class="text-indigo-400 font-mono text-sm">[PROJECT_BETA]</span>
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-cyan-300">Art & Masterpiece Index</h3>
        <p class="text-sm text-slate-400 mt-2">Historical exploration of Renaissance, Impressionist, and Modern artists.</p>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/90 border border-cyan-900/50 hover:border-cyan-500/50 transition-all group">
        <div class="h-36 rounded-xl bg-gradient-to-tr from-emerald-900/60 to-cyan-900/40 mb-4 flex items-center justify-center">
          <span class="text-emerald-400 font-mono text-sm">[PROJECT_GAMMA]</span>
        </div>
        <h3 class="text-lg font-bold text-white group-hover:text-cyan-300">VS Code Web Studio</h3>
        <p class="text-sm text-slate-400 mt-2">Instant automated web project scaffolding and launch scripts.</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-900 py-8 text-center text-sm text-slate-500">
    <p>&copy; 2026 Boss Chris. Designed with FRIDAY AI Assistant in VS Code.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
    css: `/* Custom Studio Styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}`,
    js: `// Interactive Studio Script
function showDemoAlert() {
  alert("Greetings, Boss Chris! Your modern website is running smoothly. Edit index.html in VS Code to customize your content!");
}

console.log("Chris's Website loaded successfully via FRIDAY Web Studio.");`
  },
  {
    id: 'quiz',
    name: 'Interactive Study & Quiz App',
    category: 'Study & Academics',
    description: 'An interactive study quiz covering physics, world history, and famous artists.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Study Portal - Chris</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 flex flex-col items-center justify-center">
  <div class="max-w-xl w-full bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
    <div class="flex items-center justify-between border-b border-slate-800 pb-4">
      <div>
        <h1 class="text-2xl font-bold text-cyan-400">Chris's Polymath Study Quiz</h1>
        <p class="text-xs text-slate-400">Physics, Art & World History</p>
      </div>
      <span id="score-badge" class="px-3 py-1 bg-cyan-950 text-cyan-300 text-xs font-mono rounded-full border border-cyan-800">Score: 0</span>
    </div>

    <div id="quiz-container" class="space-y-4">
      <div id="question-text" class="text-lg font-medium text-slate-200">Loading inquiry...</div>
      <div id="options-container" class="space-y-2"></div>
    </div>

    <div id="feedback" class="text-sm font-medium hidden p-3 rounded-lg"></div>

    <button id="next-btn" onclick="nextQuestion()" class="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all">
      Next Question
    </button>
  </div>

  <script>
    const questions = [
      {
        q: "Which Dutch Post-Impressionist painted 'The Starry Night' in 1889?",
        options: ["Vincent van Gogh", "Claude Monet", "Rembrandt", "Johannes Vermeer"],
        answer: 0
      },
      {
        q: "What fundamental constant in physics relates photon energy to frequency (E = h*f)?",
        options: ["Coulomb constant", "Planck constant", "Boltzmann constant", "Gravitational constant"],
        answer: 1
      },
      {
        q: "Which ancient structure is the oldest and only surviving Wonder of the Ancient World?",
        options: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Great Pyramid of Giza", "Hanging Gardens"],
        answer: 2
      }
    ];

    let current = 0;
    let score = 0;

    function renderQuestion() {
      const item = questions[current];
      document.getElementById('question-text').innerText = item.q;
      const opts = document.getElementById('options-container');
      opts.innerHTML = '';
      const feedback = document.getElementById('feedback');
      feedback.className = 'hidden';

      item.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm font-medium transition-all';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx);
        opts.appendChild(btn);
      });
    }

    function selectOption(index) {
      const item = questions[current];
      const feedback = document.getElementById('feedback');
      feedback.classList.remove('hidden');
      if (index === item.answer) {
        score += 10;
        document.getElementById('score-badge').innerText = 'Score: ' + score;
        feedback.className = 'p-3 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-sm';
        feedback.innerText = '✓ Correct, Boss Chris! Superb deduction.';
      } else {
        feedback.className = 'p-3 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 text-sm';
        feedback.innerText = '✗ Incorrect. The accurate answer was: ' + item.options[item.answer];
      }
    }

    function nextQuestion() {
      current = (current + 1) % questions.length;
      renderQuestion();
    }

    renderQuestion();
  </script>
</body>
</html>`,
    css: `/* Study Quiz Custom Theme */`,
    js: `// Quiz State logic included inline`
  },
  {
    id: 'artist-gallery',
    name: 'Art Masterpieces & Gallery',
    category: 'Art & Culture',
    description: 'An art gallery showcasing famous paintings with historical notes and curator insights.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chris's Art Exhibition</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen p-8 font-serif">
  <div class="max-w-5xl mx-auto space-y-12">
    <header class="text-center space-y-3 border-b border-neutral-800 pb-8">
      <p class="text-amber-400 text-xs tracking-widest uppercase font-sans">Curated for Boss Chris</p>
      <h1 class="text-4xl md:text-5xl font-light tracking-wide text-neutral-100">The Masterpiece Gallery</h1>
      <p class="text-neutral-400 text-sm max-w-xl mx-auto font-sans">An analytical study of Renaissance, Impressionist, and Modern visual expression.</p>
    </header>

    <div class="grid md:grid-cols-2 gap-8 font-sans">
      <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div class="h-48 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-yellow-950 flex items-center justify-center p-4 text-center">
          <span class="text-amber-200 text-lg font-serif italic">The Starry Night (1889)</span>
        </div>
        <h2 class="text-xl font-bold text-white">Vincent van Gogh</h2>
        <p class="text-sm text-neutral-400 leading-relaxed">
          Masterpiece of Post-Impressionism characterized by vibrant swirling turbulent brushstrokes, deep ultramarine skies, and luminous cadmium yellow stars painted from Saint-Rémy-de-Provence.
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div class="h-48 rounded-xl bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 flex items-center justify-center p-4 text-center">
          <span class="text-amber-200 text-lg font-serif italic">Mona Lisa (c. 1503)</span>
        </div>
        <h2 class="text-xl font-bold text-white">Leonardo da Vinci</h2>
        <p class="text-sm text-neutral-400 leading-relaxed">
          The pinnacle of the High Renaissance demonstrating sfumato (smoky blending of contours without harsh outlines) and atmospheric perspective over an enigmatic landscape.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `/* Gallery Theme */`,
    js: `// Gallery Interactive controls`
  }
];

export const VSCodeWebStudioModal: React.FC<VSCodeWebStudioModalProps> = ({
  isOpen,
  onClose,
  bossName,
  onSendToChat
}) => {
  const [selectedProject, setSelectedProject] = useState<WebsiteProject>(DEFAULT_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js' | 'vscode'>('preview');
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportToVSCode = async () => {
    setIsExporting(true);
    setExportStatus('Exporting website files & launching VS Code...');
    try {
      const res = await fetch('/api/vscode/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: selectedProject.id + '-' + bossName.toLowerCase().replace(/[^a-z0-9]/g, ''),
          files: {
            'index.html': selectedProject.html,
            'style.css': selectedProject.css,
            'script.js': selectedProject.js,
            'README.md': `# ${selectedProject.name}\n\nCreated by FRIDAY for ${bossName}.\n\n### How to Run in VS Code:\n1. Open folder in VS Code: \`code .\`\n2. Install Live Server extension (ritwickdey.LiveServer)\n3. Click "Go Live" in bottom status bar or open \`index.html\` directly in your browser!`
          },
          openInVSCode: true
        })
      });
      const data = await res.json();
      if (data.success) {
        setExportStatus(`Project created at: ${data.projectPath} | Opened in VS Code!`);
      } else {
        setExportStatus(`Saved to folder. Run 'code .' to open in VS Code.`);
      }
    } catch {
      setExportStatus('Generated project bundle ready! Copy the terminal command below to open in VS Code.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadZip = () => {
    const blob = new Blob([selectedProject.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProject.id}-index.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handlePromptFRIDAY = async () => {
    if (!customPrompt.trim()) return;
    setIsGeneratingAi(true);
    setExportStatus(`Architecting custom responsive website for ${bossName}...`);
    try {
      const res = await fetch('/api/vscode/generate-and-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          bossName,
          openInVSCode: true
        })
      });
      const data = await res.json();
      if (data.success && data.bundle) {
        const newProj: WebsiteProject = {
          id: data.bundle.projectName,
          name: data.bundle.projectName.replace(/-/g, ' ').toUpperCase(),
          category: data.bundle.category || 'Custom AI Architecture',
          description: `Custom responsive website generated by FRIDAY for ${bossName}. Saved at: ${data.projectPath}`,
          html: data.bundle.files['index.html'] || '',
          css: data.bundle.files['style.css'] || '',
          js: data.bundle.files['script.js'] || ''
        };
        setSelectedProject(newProj);
        setActiveTab('preview');
        setExportStatus(`Project created at: ${data.projectPath} | Opened in VS Code!`);
      } else if (onSendToChat) {
        onSendToChat(`Build a complete website for VS Code: ${customPrompt}`);
        onClose();
      }
    } catch {
      if (onSendToChat) {
        onSendToChat(`Build a complete website for VS Code: ${customPrompt}`);
        onClose();
      }
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md font-chakra">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.2)] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="shrink-0 px-6 py-4 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-orbitron font-bold text-cyan-300">FRIDAY WEB STUDIO & VS CODE BUILDER</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-900/60 text-cyan-300 border border-cyan-600/40">
                  WINDOWS 10 READY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate, preview, and directly launch complete responsive websites into Visual Studio Code for <span className="text-cyan-300 font-semibold">{bossName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-700 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body: Split View (Sidebar + Main Workspace) */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          
          {/* Left Sidebar: Templates & Custom Prompt */}
          <div className="w-full md:w-80 shrink-0 border-r border-cyan-500/20 bg-slate-950/90 p-4 flex flex-col space-y-4 overflow-y-auto">
            {/* Custom AI Web Generator Input */}
            <div className="p-3 rounded-xl bg-gradient-to-b from-cyan-950/50 to-slate-900 border border-cyan-500/30 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>ASK FRIDAY TO BUILD ANY WEBSITE</span>
              </div>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Build an artist portfolio with dark theme and music player..."
                className="w-full h-16 p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
              />
              <button
                onClick={handlePromptFRIDAY}
                disabled={!customPrompt.trim() || isGeneratingAi}
                className="w-full py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1 transition-all cursor-pointer"
              >
                <span>{isGeneratingAi ? 'Architecting & Saving...' : 'Generate & Save to VS Code'}</span>
              </button>
            </div>

            {/* Prebuilt Templates List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                Ready-to-Run Templates
              </span>
              {DEFAULT_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedProject.id === proj.id
                      ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,255,255,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{proj.name}</span>
                    <span className="text-[10px] text-cyan-400/80">{proj.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                </button>
              ))}
            </div>

            {/* Windows 10 VS Code Quick Tip */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs text-slate-400">
              <span className="font-bold text-cyan-300 flex items-center space-x-1 text-[11px]">
                <Laptop className="w-3.5 h-3.5" />
                <span>Windows 10 Execution Tip:</span>
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If VS Code is installed, typing <code className="text-cyan-300">code .</code> in any command prompt opens the project folder instantly.
              </p>
            </div>
          </div>

          {/* Right Main Area: Workspace & Preview */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-900/40">
            {/* Action Bar & File Tabs */}
            <div className="shrink-0 px-4 py-2 border-b border-cyan-500/20 bg-slate-950/80 flex flex-wrap items-center justify-between gap-2">
              {/* Tabs */}
              <div className="flex items-center space-x-1 text-xs">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    activeTab === 'html'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>index.html</span>
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    activeTab === 'css'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>style.css</span>
                </button>
                <button
                  onClick={() => setActiveTab('vscode')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    activeTab === 'vscode'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>VS Code Launch</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportToVSCode}
                  disabled={isExporting}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in VS Code</span>
                </button>
                <button
                  onClick={handleDownloadZip}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download HTML</span>
                </button>
              </div>
            </div>

            {/* Export Notification Banner */}
            {exportStatus && (
              <div className="px-4 py-2 bg-blue-950/90 border-b border-blue-800/60 text-xs text-blue-200 flex items-center justify-between">
                <span>{exportStatus}</span>
                <button onClick={() => setExportStatus(null)} className="text-blue-400 hover:text-white ml-2">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 p-3 overflow-hidden">
              {activeTab === 'preview' && (
                <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 bg-white shadow-inner">
                  <iframe
                    title="Live Website Preview"
                    srcDoc={selectedProject.html}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-modals"
                  />
                </div>
              )}

              {activeTab === 'html' && (
                <div className="relative w-full h-full">
                  <button
                    onClick={() => handleCopyCode(selectedProject.html)}
                    className="absolute top-3 right-3 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 border border-slate-700 flex items-center space-x-1 z-10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy HTML'}</span>
                  </button>
                  <pre className="w-full h-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-200/90 font-mono text-xs overflow-auto select-text leading-relaxed">
                    {selectedProject.html}
                  </pre>
                </div>
              )}

              {activeTab === 'css' && (
                <div className="relative w-full h-full">
                  <button
                    onClick={() => handleCopyCode(selectedProject.css)}
                    className="absolute top-3 right-3 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 border border-slate-700 flex items-center space-x-1 z-10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy CSS'}</span>
                  </button>
                  <pre className="w-full h-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-200/90 font-mono text-xs overflow-auto select-text leading-relaxed">
                    {selectedProject.css}
                  </pre>
                </div>
              )}

              {activeTab === 'vscode' && (
                <div className="w-full h-full p-6 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-6 overflow-y-auto">
                  <div>
                    <h3 className="text-base font-bold text-cyan-300 flex items-center space-x-2">
                      <Code2 className="w-5 h-5" />
                      <span>How to Run this Website Project in VS Code on Windows 10</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Step-by-step instructions prepared for <b className="text-cyan-300">{bossName}</b>.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-cyan-400 font-bold">1. One-Liner PowerShell / CMD Command</span>
                      <p className="text-slate-400 text-[11px]">Copy and paste into your terminal to generate the folder and launch VS Code:</p>
                      <div className="p-2.5 rounded bg-black/80 border border-slate-800 text-cyan-200 flex items-center justify-between">
                        <code>mkdir {selectedProject.id} ; cd {selectedProject.id} ; code .</code>
                        <button
                          onClick={() => handleCopyCode(`mkdir ${selectedProject.id} ; cd ${selectedProject.id} ; code .`)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-cyan-300"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-cyan-400 font-bold">2. Recommended VS Code Extensions for Windows 10</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                        <li><b>Live Server</b> (by Ritwick Dey) — Click "Go Live" to preview changes instantly with hot-reload.</li>
                        <li><b>Tailwind CSS IntelliSense</b> — Autocompletes modern design utilities.</li>
                        <li><b>Prettier - Code formatter</b> — Keeps your HTML/CSS/JS neat on save.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-cyan-400 font-bold">3. Double-Click Batch File</span>
                      <p className="text-slate-400 text-[11px]">
                        You can also simply double-click <code className="text-cyan-300 font-bold">OPEN_IN_VSCODE.bat</code> in your project folder!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
