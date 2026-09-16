#!/usr/bin/env node

/**
 * FRIDAY // VS Code Native Terminal Companion & AI Code Architect
 * Designed for Boss Chris <luxindustries14@gmail.com>
 * 
 * Usage inside VS Code Integrated Terminal:
 *   node friday_cli.js "build a modern saas landing page with dark theme"
 *   node friday_cli.js "create an ecommerce store with cart"
 *   node friday_cli.js --repl
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const PORT = 3000;
const HOST = '127.0.0.1';
const BOSS_NAME = 'Boss Chris';

const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const magenta = (text) => `\x1b[35m${text}\x1b[0m`;
const bold = (text) => `\x1b[1m${text}\x1b[0m`;
const gray = (text) => `\x1b[90m${text}\x1b[0m`;

function printBanner() {
  console.log(cyan(`
====================================================================
   ███████╗██████╗ ██╗██████╗  █████╗ ██╗   ██╗
   ██╔════╝██╔══██╗██║██╔══██╗██╔══██╗╚██╗ ██╔╝
   █████╗  ██████╔╝██║██║  ██║███████║ ╚████╔╝ 
   ██╔══╝  ██╔══██╗██║██║  ██║██╔══██║  ╚██╔╝  
   ██║     ██║  ██║██║██████╔╝██║  ██║   ██║   
   ╚═╝     ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   
   FRIDAY AI // VS CODE TERMINAL COMPANION & CODE ARCHITECT
====================================================================`));
  console.log(gray(`  Operator: `) + yellow(BOSS_NAME) + gray(` | Workspace: `) + cyan(process.cwd()));
  console.log(gray(`  Environment: Visual Studio Code Terminal | Node ${process.version}\n`));
}

function requestApi(endpoint, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request({
      hostname: HOST,
      port: PORT,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function handleGenerate(prompt) {
  console.log(cyan(`[*] Analyzing architectural requirements for: `) + bold(`"${prompt}"`));
  console.log(gray(`    Generating responsive structure, Tailwind styling, and interactive JavaScript...`));

  try {
    const result = await requestApi('/api/vscode/generate-and-save', {
      prompt,
      bossName: BOSS_NAME,
      targetDir: process.cwd()
    });

    if (result && result.success) {
      console.log(green(`\n[✔] Website project constructed successfully!`));
      console.log(cyan(`    Location: `) + bold(result.projectPath || process.cwd()));
      if (result.files) {
        console.log(yellow(`\n    Generated Files:`));
        for (const file of Object.keys(result.files)) {
          console.log(`      ${green('●')} ${file}`);
        }
      }
      console.log(magenta(`\n[i] Opening in Visual Studio Code...`));
      exec(`code "${result.projectPath || process.cwd()}"`, () => {});
      console.log(green(`[✔] VS Code workspace refreshed for ${BOSS_NAME}.\n`));
    } else {
      console.log(yellow(`[!] Notice: `) + (result.message || 'Generation returned with fallback response.'));
    }
  } catch (err) {
    console.log(yellow(`[!] Local FRIDAY server at port ${PORT} not running or unreachable.`));
    console.log(gray(`    Running standalone local generator fallback...`));
    generateStandaloneProject(prompt);
  }
}

function generateStandaloneProject(prompt) {
  const targetDir = path.join(process.cwd(), 'friday_generated_project');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${BOSS_NAME} - Project</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center p-6">
  <div class="max-w-2xl w-full p-8 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl text-center space-y-6">
    <h1 class="text-4xl font-extrabold text-cyan-400">${BOSS_NAME}'s Studio</h1>
    <p class="text-slate-300">Generated for instruction: "${prompt}"</p>
    <button onclick="alert('Greetings, ${BOSS_NAME}!')" class="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all">
      Explore Project
    </button>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);
  console.log(green(`[✔] Standalone project generated at: `) + targetDir);
  exec(`code "${targetDir}"`, () => {});
}

async function handleChat(prompt) {
  try {
    const result = await requestApi('/api/chat', {
      message: prompt,
      bossName: BOSS_NAME
    });

    if (result) {
      if (result.voiceText) {
        console.log(cyan(`\n[FRIDAY]: `) + bold(result.voiceText));
      }
      if (result.displayText) {
        console.log(`\n${result.displayText}\n`);
      }
      if (result.action && result.action.commandSnippet) {
        console.log(gray(`[Action Dispatched]: `) + yellow(result.action.commandSnippet));
      }
    }
  } catch (err) {
    console.log(yellow(`[!] FRIDAY Core offline. Type 'start' to launch the background service.`));
  }
}

async function main() {
  const args = process.argv.slice(2);
  printBanner();

  if (args.length > 0 && args[0] !== '--repl') {
    const prompt = args.join(' ');
    if (prompt.toLowerCase().includes('website') || prompt.toLowerCase().includes('build') || prompt.toLowerCase().includes('code')) {
      await handleGenerate(prompt);
    } else {
      await handleChat(prompt);
    }
    process.exit(0);
  }

  // REPL Interactive Mode
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: cyan(`FRIDAY [VS Code] >> `)
  });

  console.log(green(`Interactive Mode Active. Type any instruction, or commands:`));
  console.log(gray(`  - 'build website <description>' : Full structured website generated & saved`));
  console.log(gray(`  - 'open vscode'                 : Launch VS Code in current workspace`));
  console.log(gray(`  - 'taskmgr'                     : Open Task Manager`));
  console.log(gray(`  - 'exit'                        : Leave terminal companion\n`));

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (!input) {
      rl.prompt();
      return;
    }

    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log(cyan(`[FRIDAY]: Good coding session, ${BOSS_NAME}. Standing by.`));
      process.exit(0);
    }

    if (input.toLowerCase().startsWith('build website') || input.toLowerCase().startsWith('create website')) {
      await handleGenerate(input);
    } else {
      await handleChat(input);
    }

    rl.prompt();
  });
}

main();
