export interface AnimalAvatar {
  id: string;
  name: string;
  species: string;
  emoji: string;
  ecoRole: string;
  category: 'terrestre' | 'marino' | 'aves_insectos';
  badgeColor: string;
  bgGradient: string;
  svgDataUri: string;
}

// Generate high quality, ultra-clean scalable SVG data URIs for lovable animal characters
function createSvgDataUri(innerSvg: string, bgColor1: string, bgColor2: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor1}"/>
        <stop offset="100%" stop-color="${bgColor2}"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="60" fill="url(#bg)"/>
    ${innerSvg}
  </svg>`.replace(/\s+/g, ' ').trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ANIMAL_AVATARS: AnimalAvatar[] = [
  {
    id: 'panda-eco',
    name: 'Panda Guardián',
    species: 'Oso Panda',
    emoji: '',
    ecoRole: 'Protector de Bosques & Bambú',
    category: 'terrestre',
    badgeColor: 'bg-emerald-500 text-white',
    bgGradient: 'from-emerald-400 to-teal-600',
    svgDataUri: createSvgDataUri(`
      <!-- Panda Ears -->
      <circle cx="34" cy="36" r="14" fill="#1e293b"/>
      <circle cx="86" cy="36" r="14" fill="#1e293b"/>
      <circle cx="34" cy="36" r="8" fill="#334155"/>
      <circle cx="86" cy="36" r="8" fill="#334155"/>
      <!-- Panda Head -->
      <ellipse cx="60" cy="66" rx="38" ry="34" fill="#ffffff"/>
      <!-- Eye Patches -->
      <ellipse cx="44" cy="62" rx="11" ry="14" fill="#1e293b" transform="rotate(-15 44 62)"/>
      <ellipse cx="76" cy="62" rx="11" ry="14" fill="#1e293b" transform="rotate(15 76 62)"/>
      <!-- Eyes & Sparkles -->
      <circle cx="45" cy="63" r="4.5" fill="#ffffff"/>
      <circle cx="46.5" cy="61.5" r="2" fill="#0f172a"/>
      <circle cx="75" cy="63" r="4.5" fill="#ffffff"/>
      <circle cx="73.5" cy="61.5" r="2" fill="#0f172a"/>
      <circle cx="43.5" cy="64.5" r="1" fill="#ffffff"/>
      <circle cx="76.5" cy="64.5" r="1" fill="#ffffff"/>
      <!-- Cute Cheeks -->
      <ellipse cx="36" cy="74" rx="5" ry="3" fill="#f43f5e" opacity="0.35"/>
      <ellipse cx="84" cy="74" rx="5" ry="3" fill="#f43f5e" opacity="0.35"/>
      <!-- Nose & Mouth -->
      <polygon points="60,71 55,67 65,67" fill="#0f172a"/>
      <path d="M56 75 Q60 78 64 75" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Little Green Leaf on head -->
      <path d="M60 30 C55 24 64 20 66 26 C67 32 62 33 60 30 Z" fill="#22c55e"/>
      <path d="M60 30 Q63 26 65 24" stroke="#15803d" stroke-width="1" fill="none"/>
    `, '#10b981', '#047857'),
  },
  {
    id: 'fox-eco',
    name: 'Zorro Astuto',
    species: 'Zorro Silvestre',
    emoji: '',
    ecoRole: 'Vigilante de la Biodiversidad',
    category: 'terrestre',
    badgeColor: 'bg-amber-500 text-white',
    bgGradient: 'from-amber-400 to-orange-600',
    svgDataUri: createSvgDataUri(`
      <!-- Fox Ears -->
      <polygon points="26,52 36,20 54,44" fill="#ea580c"/>
      <polygon points="32,48 37,27 49,43" fill="#ffffff"/>
      <polygon points="94,52 84,20 66,44" fill="#ea580c"/>
      <polygon points="88,48 83,27 71,43" fill="#ffffff"/>
      <!-- Head Base -->
      <polygon points="60,94 22,54 98,54" fill="#f97316"/>
      <!-- White Cheeks -->
      <polygon points="60,94 22,54 44,70" fill="#ffffff"/>
      <polygon points="60,94 98,54 76,70" fill="#ffffff"/>
      <!-- Eyes -->
      <ellipse cx="44" cy="56" rx="4" ry="5" fill="#1e293b"/>
      <circle cx="45" cy="54.5" r="1.5" fill="#ffffff"/>
      <ellipse cx="76" cy="56" rx="4" ry="5" fill="#1e293b"/>
      <circle cx="75" cy="54.5" r="1.5" fill="#ffffff"/>
      <!-- Cheeks Blush -->
      <circle cx="34" cy="65" r="4" fill="#f43f5e" opacity="0.3"/>
      <circle cx="86" cy="65" r="4" fill="#f43f5e" opacity="0.3"/>
      <!-- Cute Nose -->
      <ellipse cx="60" cy="88" rx="5" ry="4" fill="#0f172a"/>
    `, '#fb923c', '#c2410c'),
  },
  {
    id: 'koala-eco',
    name: 'Koala Tierno',
    species: 'Koala Austral',
    emoji: '',
    ecoRole: 'Amante de Hojas & Selvas',
    category: 'terrestre',
    badgeColor: 'bg-slate-600 text-white',
    bgGradient: 'from-slate-400 to-slate-700',
    svgDataUri: createSvgDataUri(`
      <!-- Fluffy Big Ears -->
      <circle cx="30" cy="45" r="20" fill="#94a3b8"/>
      <circle cx="30" cy="45" r="12" fill="#f1f5f9"/>
      <circle cx="90" cy="45" r="20" fill="#94a3b8"/>
      <circle cx="90" cy="45" r="12" fill="#f1f5f9"/>
      <!-- Head -->
      <ellipse cx="60" cy="68" rx="36" ry="30" fill="#cbd5e1"/>
      <!-- Eyes -->
      <circle cx="44" cy="62" r="5" fill="#0f172a"/>
      <circle cx="45.5" cy="60" r="1.8" fill="#ffffff"/>
      <circle cx="76" cy="62" r="5" fill="#0f172a"/>
      <circle cx="77.5" cy="60" r="1.8" fill="#ffffff"/>
      <!-- Cute Big Koala Nose -->
      <ellipse cx="60" cy="72" rx="10" ry="14" fill="#1e293b"/>
      <ellipse cx="60" cy="68" rx="4" ry="2" fill="#475569" opacity="0.5"/>
      <!-- Little smile -->
      <path d="M57 88 Q60 90 63 88" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Eucalyptus Leaf in mouth -->
      <path d="M68 86 Q82 82 86 74 Q80 88 68 88 Z" fill="#22c55e"/>
    `, '#64748b', '#334155'),
  },
  {
    id: 'lion-eco',
    name: 'León Sabana',
    species: 'León Soberano',
    emoji: '',
    ecoRole: 'Líder de la Conservación',
    category: 'terrestre',
    badgeColor: 'bg-amber-600 text-white',
    bgGradient: 'from-amber-400 to-yellow-600',
    svgDataUri: createSvgDataUri(`
      <!-- Glorious Mane -->
      <circle cx="60" cy="60" r="44" fill="#d97706"/>
      <!-- Ears -->
      <circle cx="36" cy="34" r="10" fill="#f59e0b"/>
      <circle cx="36" cy="34" r="6" fill="#fbbf24"/>
      <circle cx="84" cy="34" r="10" fill="#f59e0b"/>
      <circle cx="84" cy="34" r="6" fill="#fbbf24"/>
      <!-- Head Face -->
      <circle cx="60" cy="64" rx="30" ry="28" fill="#fbbf24"/>
      <!-- Muzzle -->
      <ellipse cx="60" cy="72" rx="14" ry="10" fill="#fef3c7"/>
      <!-- Eyes -->
      <circle cx="48" cy="58" r="4.5" fill="#1e293b"/>
      <circle cx="49.5" cy="56.5" r="1.5" fill="#ffffff"/>
      <circle cx="72" cy="58" r="4.5" fill="#1e293b"/>
      <circle cx="73.5" cy="56.5" r="1.5" fill="#ffffff"/>
      <!-- Nose & Mouth -->
      <polygon points="60,70 54,65 66,65" fill="#78350f"/>
      <path d="M60 70 L60 76 M55 76 Q60 80 65 76" stroke="#78350f" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Whiskers -->
      <line x1="42" y1="73" x2="32" y2="72" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="78" y1="73" x2="88" y2="72" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
    `, '#f59e0b', '#b45309'),
  },
  {
    id: 'dolphin-eco',
    name: 'Delfín Cristal',
    species: 'Delfín Oceánico',
    emoji: '',
    ecoRole: 'Defensor de Mares Sin Plásticos',
    category: 'marino',
    badgeColor: 'bg-cyan-500 text-white',
    bgGradient: 'from-cyan-400 to-blue-600',
    svgDataUri: createSvgDataUri(`
      <!-- Dolphin Body Silhouette & Dorsal Fin -->
      <path d="M58 26 C64 36 68 44 60 52 C52 50 50 40 58 26 Z" fill="#0284c7"/>
      <ellipse cx="60" cy="65" rx="36" ry="28" fill="#38bdf8"/>
      <!-- Light Belly -->
      <ellipse cx="60" cy="74" rx="26" ry="16" fill="#e0f2fe"/>
      <!-- Cute Snout -->
      <path d="M84 66 C98 68 96 74 86 78 Z" fill="#38bdf8"/>
      <!-- Joyful Eye -->
      <circle cx="72" cy="62" r="4" fill="#0f172a"/>
      <circle cx="73.5" cy="60.5" r="1.5" fill="#ffffff"/>
      <!-- Happy Smile -->
      <path d="M78 72 Q86 74 92 71" stroke="#0284c7" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Water Droplets / Bubbles -->
      <circle cx="34" cy="40" r="4" fill="#bae6fd" opacity="0.8"/>
      <circle cx="44" cy="30" r="3" fill="#bae6fd" opacity="0.6"/>
      <circle cx="28" cy="56" r="2.5" fill="#bae6fd" opacity="0.9"/>
    `, '#06b6d4', '#0284c7'),
  },
  {
    id: 'turtle-eco',
    name: 'Tortuga Marina',
    species: 'Tortuga Carey',
    emoji: '',
    ecoRole: 'Guardián de Arrecifes & Corales',
    category: 'marino',
    badgeColor: 'bg-teal-600 text-white',
    bgGradient: 'from-teal-400 to-emerald-700',
    svgDataUri: createSvgDataUri(`
      <!-- Flippers -->
      <ellipse cx="28" cy="46" rx="14" ry="7" fill="#059669" transform="rotate(-30 28 46)"/>
      <ellipse cx="92" cy="46" rx="14" ry="7" fill="#059669" transform="rotate(30 92 46)"/>
      <ellipse cx="32" cy="80" rx="10" ry="5" fill="#059669" transform="rotate(25 32 80)"/>
      <ellipse cx="88" cy="80" rx="10" ry="5" fill="#059669" transform="rotate(-25 88 80)"/>
      <!-- Shell -->
      <circle cx="60" cy="66" r="32" fill="#047857"/>
      <circle cx="60" cy="66" r="26" fill="#10b981"/>
      <!-- Shell Geometry -->
      <polygon points="60,50 72,58 72,74 60,82 48,74 48,58" fill="#065f46" stroke="#34d399" stroke-width="1.5"/>
      <!-- Turtle Head -->
      <circle cx="60" cy="36" r="13" fill="#10b981"/>
      <circle cx="55" cy="34" r="2.5" fill="#064e3b"/>
      <circle cx="65" cy="34" r="2.5" fill="#064e3b"/>
      <path d="M57 42 Q60 45 63 42" stroke="#064e3b" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `, '#14b8a6', '#0f766e'),
  },
  {
    id: 'owl-eco',
    name: 'Búho Sabio',
    species: 'Búho Científico',
    emoji: '',
    ecoRole: 'Investigador de Polímeros Verdes',
    category: 'aves_insectos',
    badgeColor: 'bg-violet-600 text-white',
    bgGradient: 'from-purple-400 to-indigo-700',
    svgDataUri: createSvgDataUri(`
      <!-- Feather Tufts -->
      <polygon points="34,44 42,24 50,44" fill="#581c87"/>
      <polygon points="86,44 78,24 70,44" fill="#581c87"/>
      <!-- Body -->
      <ellipse cx="60" cy="68" rx="34" ry="32" fill="#7c3aed"/>
      <!-- Wings -->
      <ellipse cx="28" cy="72" rx="8" ry="18" fill="#6d28d9"/>
      <ellipse cx="92" cy="72" rx="8" ry="18" fill="#6d28d9"/>
      <!-- Breast feathers -->
      <ellipse cx="60" cy="78" rx="20" ry="18" fill="#ede9fe"/>
      <path d="M54 74 Q60 76 66 74 M52 82 Q60 84 68 82" stroke="#a78bfa" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Big Scientific Eyes -->
      <circle cx="45" cy="54" r="14" fill="#fbbf24"/>
      <circle cx="45" cy="54" r="9" fill="#1e1b4b"/>
      <circle cx="48" cy="51" r="3" fill="#ffffff"/>
      <circle cx="75" cy="54" r="14" fill="#fbbf24"/>
      <circle cx="75" cy="54" r="9" fill="#1e1b4b"/>
      <circle cx="78" cy="51" r="3" fill="#ffffff"/>
      <!-- Beak -->
      <polygon points="60,68 56,60 64,60" fill="#f59e0b"/>
    `, '#8b5cf6', '#6d28d9'),
  },
  {
    id: 'penguin-eco',
    name: 'Pingüino Glaciar',
    species: 'Pingüino Antártico',
    emoji: '',
    ecoRole: 'Centinela del Clima & Polos',
    category: 'marino',
    badgeColor: 'bg-blue-600 text-white',
    bgGradient: 'from-blue-400 to-indigo-800',
    svgDataUri: createSvgDataUri(`
      <!-- Penguin Body -->
      <ellipse cx="60" cy="65" rx="34" ry="38" fill="#0f172a"/>
      <!-- White Belly -->
      <ellipse cx="60" cy="72" rx="22" ry="26" fill="#f8fafc"/>
      <!-- Flippers -->
      <ellipse cx="24" cy="66" rx="6" ry="18" fill="#1e293b" transform="rotate(15 24 66)"/>
      <ellipse cx="96" cy="66" rx="6" ry="18" fill="#1e293b" transform="rotate(-15 96 66)"/>
      <!-- Feet -->
      <ellipse cx="48" cy="100" rx="8" ry="4" fill="#f59e0b"/>
      <ellipse cx="72" cy="100" rx="8" ry="4" fill="#f59e0b"/>
      <!-- Big Eyes -->
      <circle cx="48" cy="50" r="5" fill="#0f172a"/>
      <circle cx="50" cy="48.5" r="1.8" fill="#ffffff"/>
      <circle cx="72" cy="50" r="5" fill="#0f172a"/>
      <circle cx="74" cy="48.5" r="1.8" fill="#ffffff"/>
      <!-- Cute Beak -->
      <polygon points="60,60 54,54 66,54" fill="#f59e0b"/>
      <!-- Eco Scarf (Emerald Green) -->
      <path d="M42 60 Q60 65 78 60 Q60 68 42 60 Z" fill="#10b981"/>
      <rect x="68" y="62" width="8" height="18" rx="3" fill="#059669"/>
    `, '#3b82f6', '#1d4ed8'),
  },
  {
    id: 'rabbit-eco',
    name: 'Conejito Brote',
    species: 'Conejo Silvestre',
    emoji: '',
    ecoRole: 'Sembrador de Huertos Orgánicos',
    category: 'terrestre',
    badgeColor: 'bg-emerald-600 text-white',
    bgGradient: 'from-emerald-300 to-green-600',
    svgDataUri: createSvgDataUri(`
      <!-- Tall Cute Ears -->
      <ellipse cx="44" cy="30" rx="8" ry="24" fill="#e2e8f0" transform="rotate(-8 44 30)"/>
      <ellipse cx="44" cy="30" rx="4" ry="16" fill="#fbcfe8" transform="rotate(-8 44 30)"/>
      <ellipse cx="76" cy="30" rx="8" ry="24" fill="#e2e8f0" transform="rotate(8 76 30)"/>
      <ellipse cx="76" cy="30" rx="4" ry="16" fill="#fbcfe8" transform="rotate(8 76 30)"/>
      <!-- Head -->
      <circle cx="60" cy="68" r="28" fill="#ffffff"/>
      <!-- Eyes -->
      <circle cx="48" cy="64" r="4.5" fill="#1e293b"/>
      <circle cx="50" cy="62" r="1.5" fill="#ffffff"/>
      <circle cx="72" cy="64" r="4.5" fill="#1e293b"/>
      <circle cx="74" cy="62" r="1.5" fill="#ffffff"/>
      <!-- Cheeks -->
      <circle cx="40" cy="72" r="4" fill="#f43f5e" opacity="0.35"/>
      <circle cx="80" cy="72" r="4" fill="#f43f5e" opacity="0.35"/>
      <!-- Nose & Mouth -->
      <polygon points="60,71 57,68 63,68" fill="#f43f5e"/>
      <path d="M57 74 Q60 76 63 74" stroke="#475569" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Tiny Sprout on head -->
      <path d="M60 42 C56 36 62 34 64 38 Z" fill="#22c55e"/>
    `, '#34d399', '#059669'),
  },
  {
    id: 'frog-eco',
    name: 'Ranita Bio',
    species: 'Rana de Humedal',
    emoji: '',
    ecoRole: 'Bioindicador de Agua Dulce Pura',
    category: 'marino',
    badgeColor: 'bg-lime-600 text-white',
    bgGradient: 'from-lime-400 to-green-700',
    svgDataUri: createSvgDataUri(`
      <!-- Eye bumps -->
      <circle cx="42" cy="48" r="14" fill="#84cc16"/>
      <circle cx="78" cy="48" r="14" fill="#84cc16"/>
      <!-- Head & Jaw -->
      <ellipse cx="60" cy="68" rx="36" ry="26" fill="#84cc16"/>
      <!-- Belly -->
      <ellipse cx="60" cy="76" rx="22" ry="14" fill="#ecfccb"/>
      <!-- Big Froggy Eyes -->
      <circle cx="42" cy="48" r="9" fill="#ffffff"/>
      <circle cx="42" cy="48" r="5" fill="#1e293b"/>
      <circle cx="44" cy="46" r="2" fill="#ffffff"/>
      <circle cx="78" cy="48" r="9" fill="#ffffff"/>
      <circle cx="78" cy="48" r="5" fill="#1e293b"/>
      <circle cx="80" cy="46" r="2" fill="#ffffff"/>
      <!-- Cheeks -->
      <circle cx="34" cy="68" r="4" fill="#f43f5e" opacity="0.35"/>
      <circle cx="86" cy="68" r="4" fill="#f43f5e" opacity="0.35"/>
      <!-- Wide Happy Smile -->
      <path d="M44 72 Q60 84 76 72" stroke="#365314" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    `, '#a3e635', '#4d7c0f'),
  },
  {
    id: 'bee-eco',
    name: 'Abejita Polinizadora',
    species: 'Abeja Melífera',
    emoji: '',
    ecoRole: 'Pilar Vital del Ecosistema',
    category: 'aves_insectos',
    badgeColor: 'bg-yellow-500 text-slate-950',
    bgGradient: 'from-yellow-300 to-amber-600',
    svgDataUri: createSvgDataUri(`
      <!-- Delicate Wings -->
      <ellipse cx="44" cy="38" rx="10" ry="18" fill="#e0f2fe" opacity="0.85" transform="rotate(-30 44 38)"/>
      <ellipse cx="76" cy="38" rx="10" ry="18" fill="#e0f2fe" opacity="0.85" transform="rotate(30 76 38)"/>
      <!-- Antennae -->
      <path d="M52 46 Q46 32 40 34" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="34" r="2.5" fill="#0f172a"/>
      <path d="M68 46 Q74 32 80 34" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="80" cy="34" r="2.5" fill="#0f172a"/>
      <!-- Body -->
      <ellipse cx="60" cy="66" rx="28" ry="24" fill="#facc15"/>
      <!-- Black Stripes -->
      <path d="M46 54 Q60 58 74 54 L76 60 Q60 64 44 60 Z" fill="#0f172a"/>
      <path d="M44 68 Q60 72 76 68 L74 74 Q60 78 46 74 Z" fill="#0f172a"/>
      <!-- Cheerful Face -->
      <circle cx="50" cy="58" r="3.5" fill="#ffffff"/>
      <circle cx="51" cy="57" r="1.5" fill="#0f172a"/>
      <circle cx="70" cy="58" r="3.5" fill="#ffffff"/>
      <circle cx="71" cy="57" r="1.5" fill="#0f172a"/>
      <!-- Smile -->
      <path d="M56 64 Q60 67 64 64" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- Rosy cheeks -->
      <circle cx="42" cy="62" r="3" fill="#f43f5e" opacity="0.4"/>
      <circle cx="78" cy="62" r="3" fill="#f43f5e" opacity="0.4"/>
    `, '#fde047', '#d97706'),
  },
  {
    id: 'sloth-eco',
    name: 'Perezoso Calmo',
    species: 'Perezoso de Tres Dedos',
    emoji: '',
    ecoRole: 'Defensor del Consumo Lento & Sostenible',
    category: 'terrestre',
    badgeColor: 'bg-emerald-700 text-white',
    bgGradient: 'from-emerald-600 to-teal-800',
    svgDataUri: createSvgDataUri(`
      <!-- Tree Branch -->
      <rect x="15" y="24" width="90" height="10" rx="5" fill="#78350f"/>
      <ellipse cx="28" cy="22" rx="6" ry="3" fill="#22c55e"/>
      <!-- Hanging Paws -->
      <path d="M44 32 C44 26 50 26 50 32" stroke="#94a3b8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M70 32 C70 26 76 26 76 32" stroke="#94a3b8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Round Head -->
      <circle cx="60" cy="66" r="30" fill="#d6d3d1"/>
      <ellipse cx="60" cy="66" rx="24" ry="22" fill="#fafaf9"/>
      <!-- Eye Markings -->
      <ellipse cx="46" cy="62" rx="9" ry="6" fill="#78716c" transform="rotate(-15 46 62)"/>
      <ellipse cx="74" cy="62" rx="9" ry="6" fill="#78716c" transform="rotate(15 74 62)"/>
      <!-- Gentle Closed Eyes (Zen) -->
      <path d="M42 62 Q46 66 50 62" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M70 62 Q74 66 78 62" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Nose & Peaceful Smile -->
      <ellipse cx="60" cy="72" rx="4" ry="3" fill="#44403c"/>
      <path d="M55 78 Q60 82 65 78" stroke="#44403c" stroke-width="2" fill="none" stroke-linecap="round"/>
    `, '#10b981', '#065f46'),
  },
  {
    id: 'bear-eco',
    name: 'Oso Andino',
    species: 'Oso de Anteojos',
    emoji: '',
    ecoRole: 'Guardián de los Páramos & Montañas',
    category: 'terrestre',
    badgeColor: 'bg-amber-800 text-white',
    bgGradient: 'from-amber-700 to-stone-900',
    svgDataUri: createSvgDataUri(`
      <!-- Rounded Ears -->
      <circle cx="34" cy="38" r="13" fill="#451a03"/>
      <circle cx="34" cy="38" r="7" fill="#78350f"/>
      <circle cx="86" cy="38" r="13" fill="#451a03"/>
      <circle cx="86" cy="38" r="7" fill="#78350f"/>
      <!-- Head -->
      <circle cx="60" cy="68" r="34" fill="#451a03"/>
      <!-- Anteojos (Cream spectacle eye markings) -->
      <ellipse cx="44" cy="62" rx="12" ry="14" fill="#fef3c7"/>
      <ellipse cx="76" cy="62" rx="12" ry="14" fill="#fef3c7"/>
      <!-- Muzzle -->
      <ellipse cx="60" cy="76" rx="16" ry="12" fill="#fef3c7"/>
      <!-- Eyes -->
      <circle cx="45" cy="62" r="4" fill="#0f172a"/>
      <circle cx="46.5" cy="60.5" r="1.5" fill="#ffffff"/>
      <circle cx="75" cy="62" r="4" fill="#0f172a"/>
      <circle cx="76.5" cy="60.5" r="1.5" fill="#ffffff"/>
      <!-- Nose & Smile -->
      <ellipse cx="60" cy="74" rx="6" ry="4" fill="#1c1917"/>
      <path d="M55 82 Q60 85 65 82" stroke="#1c1917" stroke-width="2" fill="none" stroke-linecap="round"/>
    `, '#b45309', '#78350f'),
  },
  {
    id: 'monkey-eco',
    name: 'Monito Curioso',
    species: 'Mono Tití',
    emoji: '',
    ecoRole: 'Explorador de Soluciones Circulares',
    category: 'terrestre',
    badgeColor: 'bg-amber-600 text-white',
    bgGradient: 'from-amber-400 to-amber-700',
    svgDataUri: createSvgDataUri(`
      <!-- Round Ears -->
      <circle cx="28" cy="60" r="16" fill="#b45309"/>
      <circle cx="28" cy="60" r="10" fill="#fde68a"/>
      <circle cx="92" cy="60" r="16" fill="#b45309"/>
      <circle cx="92" cy="60" r="10" fill="#fde68a"/>
      <!-- Head -->
      <circle cx="60" cy="64" r="32" fill="#b45309"/>
      <!-- Face shape -->
      <path d="M46 54 C46 46 54 44 60 48 C66 44 74 46 74 54 C74 66 60 74 60 74 C60 74 46 66 46 54 Z" fill="#fde68a"/>
      <ellipse cx="60" cy="74" rx="16" ry="12" fill="#fde68a"/>
      <!-- Mischievous Eyes -->
      <circle cx="52" cy="54" r="3.5" fill="#0f172a"/>
      <circle cx="53" cy="53" r="1.2" fill="#ffffff"/>
      <circle cx="68" cy="54" r="3.5" fill="#0f172a"/>
      <circle cx="69" cy="53" r="1.2" fill="#ffffff"/>
      <!-- Nose & Big Grin -->
      <ellipse cx="60" cy="68" rx="2.5" ry="2" fill="#78350f"/>
      <path d="M50 76 Q60 84 70 76" stroke="#78350f" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Cheeks -->
      <circle cx="44" cy="70" r="3" fill="#f43f5e" opacity="0.35"/>
      <circle cx="76" cy="70" r="3" fill="#f43f5e" opacity="0.35"/>
    `, '#d97706', '#92400e'),
  },
  {
    id: 'butterfly-eco',
    name: 'Mariposa Monarca',
    species: 'Mariposa Tropical',
    emoji: '',
    ecoRole: 'Símbolo de Metamorfosis Verde',
    category: 'aves_insectos',
    badgeColor: 'bg-teal-500 text-white',
    bgGradient: 'from-teal-300 to-cyan-600',
    svgDataUri: createSvgDataUri(`
      <!-- Upper Wings -->
      <path d="M60 55 C46 22 20 30 24 56 C26 70 52 64 60 55 Z" fill="#06b6d4"/>
      <path d="M60 55 C74 22 100 30 96 56 C94 70 68 64 60 55 Z" fill="#06b6d4"/>
      <!-- Lower Wings -->
      <path d="M60 62 C48 64 30 76 36 90 C42 98 56 84 60 62 Z" fill="#14b8a6"/>
      <path d="M60 62 C72 64 90 76 84 90 C78 98 64 84 60 62 Z" fill="#14b8a6"/>
      <!-- Wing spots -->
      <circle cx="38" cy="48" r="4" fill="#ffffff" opacity="0.8"/>
      <circle cx="82" cy="48" r="4" fill="#ffffff" opacity="0.8"/>
      <circle cx="44" cy="80" r="3" fill="#ffffff" opacity="0.8"/>
      <circle cx="76" cy="80" r="3" fill="#ffffff" opacity="0.8"/>
      <!-- Butterfly Center Body -->
      <ellipse cx="60" cy="62" rx="4" ry="18" fill="#0f172a"/>
      <!-- Head & Antennae -->
      <circle cx="60" cy="42" r="5" fill="#0f172a"/>
      <path d="M58 40 Q50 30 46 32" stroke="#0f172a" stroke-width="1.5" fill="none"/>
      <path d="M62 40 Q70 30 74 32" stroke="#0f172a" stroke-width="1.5" fill="none"/>
    `, '#2dd4bf', '#0891b2'),
  },
  {
    id: 'wolf-eco',
    name: 'Lobo Solidario',
    species: 'Lobo Ibérico',
    emoji: '',
    ecoRole: 'Equilibrio de Bosques & Manada',
    category: 'terrestre',
    badgeColor: 'bg-indigo-600 text-white',
    bgGradient: 'from-indigo-400 to-slate-800',
    svgDataUri: createSvgDataUri(`
      <!-- Pointed Wolf Ears -->
      <polygon points="34,50 40,24 54,46" fill="#475569"/>
      <polygon points="38,46 42,30 50,44" fill="#f1f5f9"/>
      <polygon points="86,50 80,24 66,46" fill="#475569"/>
      <polygon points="82,46 78,30 70,44" fill="#f1f5f9"/>
      <!-- Wolf Head -->
      <polygon points="60,92 26,56 94,56" fill="#64748b"/>
      <!-- Cheeks Light -->
      <polygon points="60,92 26,56 46,72" fill="#e2e8f0"/>
      <polygon points="60,92 94,56 74,72" fill="#e2e8f0"/>
      <!-- Sharp Golden Eyes -->
      <polygon points="42,56 48,52 50,58" fill="#fbbf24"/>
      <circle cx="46" cy="55" r="1.5" fill="#0f172a"/>
      <polygon points="78,56 72,52 70,58" fill="#fbbf24"/>
      <circle cx="74" cy="55" r="1.5" fill="#0f172a"/>
      <!-- Black Nose -->
      <ellipse cx="60" cy="88" rx="5" ry="3.5" fill="#0f172a"/>
    `, '#6366f1', '#1e1b4b'),
  },
];

export const ECO_TITLES = [
  'Guardián de la Biodiversidad',
  'Defensor de Mares Limpios',
  'Investigador Bio-Polímeros',
  'Pionero del Almidón Circular',
  'Héroe del Compostaje Casero',
  'Embajador Solviplas',
  'Innovador Cero Residuos',
  'Eco-Creativo Comunitario',
];

export const ECO_INTERESTS = [
  'Almidón de Yuca & Maíz',
  'Protección de Fauna Marina',
  'Bioplásticos Compostables',
  'Formulación Química Verde',
  'Empaques Biodegradables',
  'Educación Ambiental Escolar',
  'Disolución Hidrosoluble',
  'Huertos & Abono Orgánico',
];

export const THEME_COLORS = [
  { id: 'emerald', label: 'Verde Esmeralda', class: 'from-emerald-500 to-teal-600', text: 'text-emerald-500' },
  { id: 'teal', label: 'Turquesa Marino', class: 'from-teal-500 to-cyan-600', text: 'text-teal-500' },
  { id: 'cyan', label: 'Azul Océano', class: 'from-cyan-500 to-blue-600', text: 'text-cyan-500' },
  { id: 'amber', label: 'Ámbar Solar', class: 'from-amber-500 to-orange-600', text: 'text-amber-500' },
  { id: 'violet', label: 'Violeta Botánico', class: 'from-purple-500 to-indigo-600', text: 'text-purple-500' },
  { id: 'rose', label: 'Rosa Floral', class: 'from-rose-500 to-pink-600', text: 'text-rose-500' },
] as const;

/**
 * Compresses an image file from the user's gallery / camera
 * so it is fast, lightweight, and safely stores into Firestore & localStorage
 */
export async function compressAndResizeImage(
  file: File,
  maxWidth = 360,
  maxHeight = 360,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        // Draw and compress to JPEG or WEBP
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
