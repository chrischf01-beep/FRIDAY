"""
FRIDAY Brain Module
Connects to Google Gemini API using @google/genai or google-genai
Enforces FRIDAY identity, boss name address, and real Windows execution commands.
"""
import os
import time
import threading
from google import genai
from google.genai import types
from offline_knowledge import resolve_offline_query

class FridayBrain:
    def __init__(self, boss_name="Boss Chris"):
        self.boss_name = boss_name
        self.api_key = self._load_api_key()
        self.client = None
        self.models_to_try = [
            "gemini-flash-latest",
            "gemini-3.1-flash-lite",
            "gemini-3.8-flash"
        ]
        
        try:
            self.client = genai.Client(api_key=self.api_key)
            print(f"[BRAIN] Gemini Client initialized for {self.boss_name}.")
        except Exception as e:
            print(f"[BRAIN ERROR] Could not initialize Gemini client: {e}")

    def _load_api_key(self) -> str:
        """Loads API key from env var, api_key.txt file, or default project fallback."""
        # 1. Environment variable
        env_key = os.environ.get("GEMINI_API_KEY")
        if env_key and len(env_key.strip()) > 10:
            return env_key.strip()
            
        # 2. Check python_desktop/api_key.txt or ../api_key.txt
        for path in ["api_key.txt", "python_desktop/api_key.txt", "../api_key.txt"]:
            if os.path.isfile(path):
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        key = f.read().strip()
                        if key and len(key) > 10:
                            print(f"[BRAIN] Loaded custom Gemini API key from {path}")
                            return key
                except Exception:
                    pass

        # 3. Default fallback key
        return "AQ.Ab8RN6LNsIe-3Nn2FTxy4clYvH_hC4s3tOFKs603ISZutDGP5g"

    def ask(self, prompt: str) -> str:
        # Fast local path: Instant answer for greetings and common study/art queries
        # to preserve cloud API quota and ensure zero lag!
        local_reply = resolve_offline_query(prompt, self.boss_name)
        if local_reply and prompt.strip().lower() in [
            "hi", "hello", "hey", "test", "who are you", "what can you do", "yo", "sup"
        ]:
            return local_reply

        if not self.client:
            if local_reply:
                return local_reply
            return f"{self.boss_name}, the Gemini neural link is initializing. Local systems and PC actions are online."
        
        system_instruction = f"""
You are FRIDAY (spelled FRIDAY, NOT F.R.I.D.A.Y.), Tony Stark's executive AI companion and polymath tutor calibrated for Windows 10.
You run natively on Windows 10 as a desktop application with background execution, and you MUST address the user as "{self.boss_name}".
Voice & Tone: Articulate, sharp, calm, confident, and professional with subtle warmth and wit.

Core Knowledge Areas:
1. Academic Studies & Tutoring: Math (calculus, algebra, geometry), physics, chemistry, biology, computer science, and history.
2. World & Culture: Global geography, ancient civilizations, world wonders, architecture, languages.
3. Master Artists & Music: Vincent van Gogh, Leonardo da Vinci, Claude Monet, Rembrandt, Picasso, classical & modern music theory.
4. Windows 10 System: Process telemetry, hardware status, volume control, desktop workflow automation.

Directives:
1. Address the boss as "{self.boss_name}".
2. Start with a crisp, direct 1-2 sentence voice-spoken summary, followed by thorough, structured Markdown with clear steps, formulas, and explanations.
"""
        last_error = None

        # Model Cascade: Try gemini-flash-latest -> gemini-3.1-flash-lite -> gemini-3.8-flash
        for model_name in self.models_to_try:
            for attempt in range(2):  # Try twice per model with 1.2s retry on temporary spikes
                try:
                    response = self.client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=system_instruction,
                            temperature=0.7,
                        )
                    )
                    if response and response.text:
                        return response.text.strip()
                except Exception as e:
                    err_str = str(e)
                    last_error = err_str
                    # If 503 (temporary high demand spike) or transient, wait briefly and retry
                    if "503" in err_str or "UNAVAILABLE" in err_str:
                        time.sleep(1.2)
                        continue
                    # If 429 (quota or rate limit), move immediately to next model in the cascade
                    if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                        break
                    break

        # If cloud models failed or hit quota, use the offline polymath knowledge base
        if local_reply:
            return local_reply

        # Graceful, polished explanation if cloud rate-limit is currently active
        is_quota = "429" in str(last_error) or "RESOURCE_EXHAUSTED" in str(last_error)
        is_demand = "503" in str(last_error) or "UNAVAILABLE" in str(last_error)

        if is_quota:
            return (
                f"Notice for {self.boss_name}: The free-tier Gemini API request limit has hit a temporary 20-second cooldown.\n\n"
                f"- **Offline Intelligence Active:** You can ask about **Van Gogh**, **Da Vinci**, **Calculus**, **Physics**, or **World Wonders**, or issue **Windows commands** (CPU, RAM, Kill process, Launch apps).\n"
                f"- **Custom Key Support:** To bypass rate limits entirely, you can create a free personal key at [aistudio.google.com](https://aistudio.google.com/) and paste it into `python_desktop\\api_key.txt`."
            )
        elif is_demand:
            return (
                f"Notice for {self.boss_name}: Google's cloud server is experiencing a momentary demand spike. "
                f"Please repeat your command in a few moments, or ask one of your study/art/system questions."
            )

        return f"Neural link status for {self.boss_name}: Local systems standing by. (Error details: {last_error[:120]}...)"

    def ask_async(self, prompt: str, callback):
        def worker():
            reply = self.ask(prompt)
            callback(reply)
        t = threading.Thread(target=worker, daemon=True)
        t.start()

