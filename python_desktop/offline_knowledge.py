"""
FRIDAY Offline Knowledge Base & Polymath Fallback Engine
Ensures Boss Chris always receives intelligent, articulate answers even during
temporary 503 (cloud demand spikes) or 429 (API rate-limit cooldowns).
"""
import re

OFFLINE_ARTISTS = {
    "van gogh": """### Vincent van Gogh (1853–1890) // Dutch Post-Impressionist Master
- **Style & Movement:** Post-Impressionism characterized by dramatic brushstrokes, vibrant emotional color palettes, and intense psychological depth.
- **Masterpieces:**
  - *The Starry Night* (1889) — Painted from his room in the Saint-Paul asylum in Saint-Rémy. Features turbulent swirling celestial skies and a glowing crescent moon.
  - *Sunflowers* (1888) — A series of still lifes created in Arles to decorate Paul Gauguin's bedroom in the Yellow House.
  - *Café Terrace at Night* (1888) — Notable for depicting a night sky without using black pigments.
  - *Wheatfield with Crows* (1890) — One of his final powerful works exploring freedom and isolation.
- **Historical Significance:** Van Gogh produced more than 2,100 artworks in just over a decade, laying foundational groundwork for modern 20th-century expressionism.""",

    "da vinci": """### Leonardo da Vinci (1452–1519) // Florentine Renaissance Polymath
- **Style & Movement:** High Renaissance master of *sfumato* (soft, smoky transitions without harsh outlines) and anatomical precision.
- **Masterpieces:**
  - *Mona Lisa (La Gioconda)* (c. 1503–1519) — Famous for the elusive smile and groundbreaking atmospheric perspective.
  - *The Last Supper* (1495–1498) — Milanese refectory fresco demonstrating dramatic linear perspective converging on Christ.
  - *Vitruvian Man* (c. 1490) — Legendary study illustrating ideal human proportions aligned with sacred geometry.
- **Polymath Legacy:** Pioneer across flight mechanics, hydraulics, military engineering, botany, and optics.""",

    "monet": """### Claude Monet (1840–1926) // Father of Impressionism
- **Style & Movement:** French Impressionism. Monet focused on capturing the fleeting impressions of natural light, changing seasons, and weather on landscapes.
- **Masterpieces:**
  - *Impression, Sunrise* (1872) — The painting that gave the Impressionist movement its name.
  - *Water Lilies (Nymphéas)* series — Massive panoramic canvases painted in his water garden at Giverny.
  - *Rouen Cathedral* & *Haystacks* series — Systematic studies of the same subject across different hours and lighting conditions.""",

    "picasso": """### Pablo Picasso (1881–1973) // Spanish Modernist Pioneer
- **Style & Periods:** Co-founder of Cubism. Key periods include:
  - *Blue Period* (1901–1904) — Somber monochromatic blue works reflecting poverty and grief (*The Old Guitarist*).
  - *Rose Period* (1904–1906) — Warmer tones with circus performers and harlequins.
  - *Cubism* (1909–1919) — Deconstruction of objects into geometric multi-perspective planes (*Les Demoiselles d'Avignon*).
  - *Guernica* (1937) — Monumental anti-war masterpiece protesting the bombing of Guernica in the Spanish Civil War.""",

    "rembrandt": """### Rembrandt van Rijn (1606–1669) // Dutch Golden Age Titan
- **Style & Movement:** Baroque and Dutch Golden Age, celebrated for mastery of *chiaroscuro* (dramatic contrasts between luminous light and deep shadow).
- **Masterpieces:**
  - *The Night Watch* (1642) — Colossal civic guard portrait revolutionary for its dynamic motion and lifelike lighting.
  - *The Anatomy Lesson of Dr. Nicolaes Tulp* (1632) — Intense scientific portrait.
  - Over 80 introspective self-portraits chronicling the human condition across his lifetime."""
}

OFFLINE_STUDIES = {
    "calculus": """### Calculus Quick-Study Master Guide
Calculus is the mathematical study of continuous change, divided into two fundamental branches connected by the **Fundamental Theorem of Calculus**:

1. **Differential Calculus (Derivatives):**
   - Measures instantaneous rate of change and slopes of curves.
   - Formula: $\\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$
   - Key Rules:
     - Power Rule: $\\frac{d}{dx}[x^n] = n x^{n-1}$
     - Product Rule: $(uv)' = u'v + uv'$
     - Chain Rule: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$

2. **Integral Calculus (Integrals):**
   - Measures accumulation of quantities and areas under curves.
   - Formula: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$
   - Fundamental Theorem: $\\int_{a}^{b} f'(x) dx = f(b) - f(a)$""",

    "physics": """### Core Physics Fundamentals Guide
1. **Newton's Three Laws of Motion:**
   - **First Law (Inertia):** An object at rest remains at rest, and an object in uniform motion stays in motion unless acted upon by a net external force.
   - **Second Law (Force):** $\\vec{F} = m \\vec{a}$ (Force equals mass times acceleration).
   - **Third Law (Action & Reaction):** For every action, there is an equal and opposite reaction.
2. **Conservation Laws:**
   - Energy cannot be created or destroyed, only transformed ($E_{total} = K + U$).
   - Mass-energy equivalence: $E = mc^2$.
3. **Electromagnetism:**
   - Ohm's Law: $V = I \\cdot R$ (Voltage = Current $\\times$ Resistance).
   - Speed of light in vacuum: $c \\approx 3.00 \\times 10^8 \\text{ m/s}$.""",

    "biology": """### Key Biology Study Review
1. **Cell Theory:**
   - All living organisms are composed of one or more cells.
   - The cell is the basic structural and functional unit of life.
   - All cells arise from pre-existing cells through division.
2. **DNA Structure (Watson & Crick):**
   - Double helix composed of nucleotides (Phosphate, Deoxyribose sugar, Nitrogenous base).
   - Base Pairing: Adenine (A) pairs with Thymine (T); Cytosine (C) pairs with Guanine (G).
3. **Photosynthesis vs. Cellular Respiration:**
   - **Photosynthesis:** $6CO_2 + 6H_2O + \\text{light} \\to C_6H_{12}O_6 + 6O_2$ (chloroplasts).
   - **Respiration:** $C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + 36-38\\text{ ATP}$ (mitochondria).""",

    "chemistry": """### High-Yield Chemistry Study Guide
1. **The Atom:**
   - Protons ($+1$) and Neutrons ($0$) reside in the dense nucleus; Electrons ($-1$) occupy quantized orbitals.
   - Atomic Number ($Z$) = number of protons; Mass Number ($A$) = protons + neutrons.
2. **Chemical Bonds:**
   - **Covalent:** Sharing of electron pairs between nonmetals (e.g., $H_2O, CH_4$).
   - **Ionic:** Transfer of electrons forming electrostatic ions (e.g., $Na^+Cl^-$).
   - **Hydrogen Bonding:** Strong dipole intermolecular attraction involving $H$ bonded to $N, O,$ or $F$.
3. **pH Scale:**
   - $pH = -\\log_{10}[H^+]$.
   - $pH < 7$ is Acidic, $pH = 7$ is Neutral (pure water), $pH > 7$ is Basic/Alkaline."""
}

OFFLINE_WORLD = {
    "wonders": """### Seven Wonders of the World Guide
**1. The Seven Wonders of the Ancient World:**
- Great Pyramid of Giza (Egypt — the only ancient wonder still standing)
- Hanging Gardens of Babylon (Iraq)
- Statue of Zeus at Olympia (Greece)
- Temple of Artemis at Ephesus (Turkey)
- Mausoleum at Halicarnassus (Turkey)
- Colossus of Rhodes (Greece)
- Lighthouse of Alexandria (Egypt)

**2. The New 7 Wonders of the World (Declared 2007):**
- Great Wall of China (China)
- Petra (Jordan)
- The Colosseum (Rome, Italy)
- Chichén Itzá (Mexico)
- Machu Picchu (Peru)
- Taj Mahal (Agra, India)
- Christ the Redeemer (Rio de Janeiro, Brazil)""",

    "geography": """### Global Geography Quick Reference
- **Largest Continent by Area & Population:** Asia (44.6 million $\\text{km}^2$, ~4.7 billion people).
- **Highest Terrestrial Peak:** Mount Everest (8,848.86 m / 29,031.7 ft above sea level in Himalayas).
- **Deepest Oceanic Trench:** Mariana Trench (Challenger Deep, ~10,994 m / 36,070 ft deep).
- **Longest River:** The Nile (~6,650 km), followed closely by the Amazon (~6,400 km).
- **Largest Freshwater Lake by Surface Area:** Lake Superior (North America); by volume: Lake Baikal (Siberia, holding ~20% of Earth's unfrozen surface freshwater)."""
}

def resolve_offline_query(query: str, boss_name: str = "Boss Chris") -> str | None:
    """Attempts to intelligently answer common greetings, studies, arts, and world questions offline."""
    q = query.strip().lower()
    
    # 1. Greetings
    if re.match(r'^(hi|hello|hey|greetings|good morning|good afternoon|good evening|yo|sup|hiya)[\s!\.\?]*$', q) or q in ["hi", "hello", "hey", "test"]:
        return (
            f"Hello, {boss_name}! Systems are fully operational and I am standing by.\n\n"
            f"You can ask me any **study question** (math, physics, chemistry, biology), "
            f"inquire about **world history & geography**, discuss **famous artists** (Van Gogh, Da Vinci, Monet), "
            f"or ask for **Windows 10 system controls & website scaffolding**."
        )

    # 2. Who are you / Identity
    if "who are you" in q or "what can you do" in q or "introduce yourself" in q:
        return (
            f"I am FRIDAY, your executive AI desktop companion calibrated for Windows 10, {boss_name}.\n\n"
            f"- **Operator:** {boss_name}\n"
            f"- **Execution:** Native Windows 10 desktop application with background system tray support and `Ctrl+Alt+F` hotkey.\n"
            f"- **Specializations:** Academic tutoring, master artist biographies, world civilization queries, and website building for VS Code.\n"
            f"- **PC Control:** Real-time CPU, RAM, disk diagnostics, application launch, and system monitoring."
        )

    # 3. Artists
    for key, text in OFFLINE_ARTISTS.items():
        if key in q:
            return f"Here is the art and history dossier for {boss_name}:\n\n{text}"

    # 4. Studies
    for key, text in OFFLINE_STUDIES.items():
        if key in q:
            return f"Here is the academic study guide for {boss_name}:\n\n{text}"

    # 5. World / Geography
    for key, text in OFFLINE_WORLD.items():
        if key in q:
            return f"Here is the geographical & world history breakdown for {boss_name}:\n\n{text}"

    # 6. Websites / VS Code
    if "website" in q or "vscode" in q or "vs code" in q or "html" in q:
        return (
            f"To create websites and open them directly in Visual Studio Code, {boss_name}:\n\n"
            f"1. **VS Code Studio in FRIDAY:** Click the **VS CODE STUDIO** button on your HUD top navigation.\n"
            f"2. **Double-Click Batch:** In your folder, double-click `OPEN_IN_VSCODE.bat` to create an instant starter website on your Desktop.\n"
            f"3. **Run from Terminal:** Open VS Code terminal (`Ctrl+\\``) and run:\n"
            f"   ```powershell\n"
            f"   code .\n"
            f"   ```\n"
            f"4. Use the **Live Server** extension in VS Code to see real-time updates as you edit `index.html`!"
        )

    return None
