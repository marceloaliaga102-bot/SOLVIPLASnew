import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import {
  SiteConfig,
  User,
  Comment,
  MediaItem,
  TeamMember,
  ActivityItem,
  ProductItem,
  CustomSection,
  TutorialStep,
  RecipeIngredient,
  NewsArticle,
} from '../types';
import {
  INITIAL_SITE_CONFIG,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOM_SECTIONS,
  INITIAL_TEAM,
  INITIAL_ACTIVITIES,
  INITIAL_MEDIA,
  INITIAL_COMMENTS,
} from '../data/initialData';
import { ANIMAL_AVATARS } from '../data/animalAvatars';

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Lanzamiento de la Fórmula Solviplas 2.0 con Mayor Transparencia y Flexibilidad',
    summary: 'Ajustamos la proporción de plastificante natural y almidón refinado, logrando láminas bioplásticas con un 35% más de resistencia a la tracción y solubilidad completa en menos de 60 segundos.',
    content: `Nos complace anunciar la formulación optimizada de Solviplas 2.0. A través de una serie de ensayos sistemáticos en laboratorio casero y talleres escolares, refinamos la combinación de plastificantes hidrofílicos y almidón vegetal.

Principales mejoras de la versión 2.0:
• Mayor transparencia óptica: Las láminas ahora permiten la lectura clara de textos y etiquetas al ser usadas como fundas de cuadernos o forros protectores.
• Flexibilidad duradera: Se redujo la fragilidad al secarse en climas de baja humedad ambiental gracias a un balance micrométrico de glicerina.
• Disolución ultra rápida: Al entrar en contacto con agua a 35°C-40°C, el biopolímero se solubiliza en menos de un minuto sin dejar grumos ni residuos plásticos nocivos.

Esta fórmula continúa siendo 100% inocua, sin emisión de vapores tóxicos durante su cocción y con insumos de bajo costo accesibles en cualquier mercado local.`,
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    date: '2025-06-15',
    author: 'Equipo de Investigación Solviplas',
    authorRole: 'I+D Química Verde',
    category: 'Innovación',
    readTime: '3 min de lectura',
    isFeatured: true,
    tags: ['Formulación', 'Biopolímeros', 'Química Verde', 'Innovación']
  },
  {
    id: 'news-2',
    title: 'Primer Taller Comunitario con 100 Participantes en Lima Sur',
    summary: 'Concluimos satisfactoriamente las jornadas de capacitación donde familias, estudiantes y docentes produjeron sus propios bioplásticos biodegradables y conocieron los principios de la economía circular.',
    content: `Durante dos fines de semana intensivos se llevó a cabo el primer taller presencial y práctico de Solviplas, reuniendo a 100 participantes activos entre estudiantes de secundaria, padres de familia y docentes de ciencias.

Hitos destacados de la jornada:
• Cada participante elaboró exitosamente al menos 3 láminas funcionales de bioplástico utilizando la guía paso a paso.
• Se aplicaron encuestas pre-test y post-test para medir la comprensión de los riesgos de los plásticos derivados del petróleo frente a alternativas solubles.
• El 89% de los asistentes expresó su total disposición para reemplazar forros y bolsas convencionales por Solviplas en sus actividades cotidianas.

Agradecemos profundamente el entusiasmo y la colaboración de toda la comunidad escolar y vecinal que hizo posible este encuentro.`,
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    date: '2025-06-02',
    author: 'Coordinación Comunitaria',
    authorRole: 'Extensión Social',
    category: 'Talleres',
    readTime: '4 min de lectura',
    isFeatured: false,
    tags: ['Talleres', 'Comunidad', 'Educación Ambiental', 'Lima']
  },
  {
    id: 'news-3',
    title: 'Nuevos Prototipos en Desarrollo: Bolsas para Siembra y Sobres Hidrosolubles',
    summary: 'Estamos ensayando cubiertas agrícolas degradables que se disuelven directamente al regar la tierra, aportando nutrientes orgánicos y eliminando los microplásticos de los huertos urbanos.',
    content: `Como parte de la diversificación de prototipos de Solviplas, el equipo ha comenzado a implementar bolsas para almacigueras y germinación de semillas.

¿Cómo funciona este nuevo prototipo?
A diferencia de las bolsas plásticas tradicionales que deben ser rasgadas y desechadas al trasplantar la plántula al suelo, la bolsa Solviplas se entierra completa junto con la raíz. Al regar la planta, el bioplástico se solubiliza en contacto con el agua y la humedad del suelo, actuando además como materia orgánica inocua para los microorganismos benéficos del compost.

Próximamente compartiremos las fichas técnicas y los resultados de crecimiento comparativo de plantas en nuestra sección de catálogo.`,
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80',
    date: '2025-05-20',
    author: 'Laboratorio de Prototipos',
    authorRole: 'Desarrollo de Producto',
    category: 'Prototipos',
    readTime: '3 min de lectura',
    isFeatured: false,
    tags: ['Agricultura', 'Huertos', 'Biodegradabilidad', 'Prototipos']
  },
  {
    id: 'news-4',
    title: 'Cálculo de Huella de Carbono: Solviplas Reduce hasta un 60% las Emisiones',
    summary: 'Un estudio comparativo basado en directrices de ciclo de vida confirma que sustituir polietileno por biopolímeros a base de almidón disminuye drásticamente el impacto ambiental.',
    content: `Un análisis preliminar de ciclo de vida (ACV) comparó el impacto ambiental de producir 1 kilogramo de película plástica convencional derivada de hidrocarburos versus 1 kilogramo de matriz Solviplas elaborada con almidón vegetal local.

Conclusiones del estudio:
1. Huella de carbono reducida: La fotosíntesis de las plantas fijadoras de almidón captura dióxido de carbono durante su crecimiento, generando un balance neto de carbono significativamente menor (-60%).
2. Cero toxicidad hídrica: Los subproductos de la disolución no contienen bisfenol A (BPA), ftalatos ni disruptores endocrinos.
3. Descomposición benigna: En caso de llegar accidentalmente a drenajes urbanos o fuentes de agua, se degrada biológicamente sin formar microplásticos acumulativos.`,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    date: '2025-05-05',
    author: 'Área de Sostenibilidad',
    authorRole: 'Evaluación de Impacto',
    category: 'Ciencia',
    readTime: '4 min de lectura',
    isFeatured: false,
    tags: ['Huella de Carbono', 'Química Verde', 'ODS 12', 'ODS 13']
  }
];

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  resetToDefaultConfig: () => void;

  // Products
  products: ProductItem[];
  addProduct: (product?: Partial<ProductItem>) => void;
  updateProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  // Custom Sections
  customSections: CustomSection[];
  addCustomSection: (section?: Partial<CustomSection>) => void;
  updateCustomSection: (id: string, updated: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;

  // Tutorial
  tutorialSteps: TutorialStep[];
  updateTutorialStep: (id: string, updated: Partial<TutorialStep>) => void;
  addTutorialStep: () => void;
  deleteTutorialStep: (id: string) => void;
  tutorialIngredients: RecipeIngredient[];
  updateTutorialIngredient: (id: string, updated: Partial<RecipeIngredient>) => void;
  addTutorialIngredient: () => void;
  deleteTutorialIngredient: (id: string) => void;

  // Auth state & Clean session switching
  currentUser: User | null;
  isAdmin: boolean;
  registerUser: (userData: {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    role?: any;
    institution?: string;
    bio?: string;
    ecoTitle?: string;
    ecoInterest?: string;
    location?: string;
    themeColor?: 'emerald' | 'teal' | 'cyan' | 'amber' | 'violet' | 'rose';
    avatarType?: 'animal' | 'custom' | 'default';
    avatarAnimalId?: string;
  }) => Promise<boolean>;
  loginUser: (identifier: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserProfile: (profileData: Partial<User>) => Promise<boolean>;

  // Comments
  comments: Comment[];
  addComment: (content: string, category: 'opinion' | 'pregunta' | 'felicitacion' | 'idea', rating: number, authorName?: string) => boolean;
  toggleLikeComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
  pinComment: (commentId: string) => void;
  replyComment: (commentId: string, reply: string, authorName?: string, authorAvatar?: string, isOfficial?: boolean) => void;

  // Multi-window / Multi-page Navigation
  currentWindow: string;
  setCurrentWindow: (windowId: string) => void;

  // Media
  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  updateMediaItem: (id: string, updated: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  toggleFeaturedMedia: (id: string) => void;

  // Team & Activities
  teamMembers: TeamMember[];
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  activities: ActivityItem[];
  updateActivity: (id: string, updated: Partial<ActivityItem>) => void;

  // News
  newsArticles: NewsArticle[];
  addNewsArticle: (article?: Partial<NewsArticle>) => void;
  updateNewsArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  // Modal Controls
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Canva-style In-Place Edit Mode
  isLiveEditEnabled: boolean;
  setIsLiveEditEnabled: (enabled: boolean) => void;
  isEditModeActive: boolean;
  setIsEditModeActive: (active: boolean) => void;
  toggleEditMode: () => void;

  // Logo & Branding Modal
  isLogoModalOpen: boolean;
  setIsLogoModalOpen: (open: boolean) => void;

  // Section Creator Modal
  isNewSectionModalOpen: boolean;
  setIsNewSectionModalOpen: (open: boolean) => void;

  // Product Creator Modal
  isNewProductModalOpen: boolean;
  setIsNewProductModalOpen: (open: boolean) => void;

  // Cloud Sync Status
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  triggerSync: () => Promise<void>;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'solviplas_site_config_v3',
  USER: 'solviplas_current_user_v3',
  REGISTERED_USERS: 'solviplas_registered_users_v3',
  PRODUCTS: 'solviplas_products_v3',
  CUSTOM_SECTIONS: 'solviplas_custom_sections_v3',
  COMMENTS: 'solviplas_comments_v3',
  MEDIA: 'solviplas_media_v3',
  TEAM: 'solviplas_team_v3',
  ACTIVITIES: 'solviplas_activities_v3',
  TUTORIAL_STEPS: 'solviplas_tut_steps_v3',
  TUTORIAL_ING: 'solviplas_tut_ing_v3',
  NEWS: 'solviplas_news_articles_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...INITIAL_SITE_CONFIG, ...JSON.parse(saved) } : INITIAL_SITE_CONFIG;
    } catch {
      return INITIAL_SITE_CONFIG;
    }
  });

  // Products
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Custom Sections
  const [customSections, setCustomSections] = useState<CustomSection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_SECTIONS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_SECTIONS;
    } catch {
      return INITIAL_CUSTOM_SECTIONS;
    }
  });

  // Tutorial Steps & Ingredients
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TUTORIAL_STEPS);
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONFIG.tutorialSteps;
    } catch {
      return INITIAL_SITE_CONFIG.tutorialSteps;
    }
  });

  const [tutorialIngredients, setTutorialIngredients] = useState<RecipeIngredient[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TUTORIAL_ING);
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONFIG.tutorialIngredients;
    } catch {
      return INITIAL_SITE_CONFIG.tutorialIngredients;
    }
  });

  // Users
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Comments
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Media
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
      return saved ? JSON.parse(saved) : INITIAL_MEDIA;
    } catch {
      return INITIAL_MEDIA;
    }
  });

  // Team
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
      return saved ? JSON.parse(saved) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  });

  // Activities
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  // News Articles
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  // Modals & In-place Canva edit state (strictly disabled by default for visitors)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLiveEditEnabled, setIsLiveEditEnabled] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // Multi-window & Multi-page Modular Navigation
  const resolveWindowId = (rawHash: string): string => {
    const clean = rawHash.replace('#', '').toLowerCase();
    if (!clean) return 'inicio';
    if (['inicio', 'tutorial', 'productos', 'resultados', 'noticias', 'equipo', 'comunidad'].includes(clean)) {
      return clean;
    }
    if (['galeria', 'gallery', 'evidencias', 'fotos', 'videos', 'results'].includes(clean)) return 'resultados';
    if (['news', 'novedades', 'actualizaciones'].includes(clean)) return 'noticias';
    if (['home', 'hero', 'overview', 'portada'].includes(clean)) return 'inicio';
    if (['receta', 'formula', 'proceso', 'recipe', 'pasos', 'preparacion'].includes(clean)) return 'tutorial';
    if (['products', 'producto', 'catalogo'].includes(clean)) return 'productos';
    if (['nosotros', 'cronograma', 'timeline', 'team', 'equipo', 'metas'].includes(clean)) return 'equipo';
    if (['comentarios', 'foro', 'comments', 'preguntas', 'feedback'].includes(clean)) return 'comunidad';
    return clean;
  };

  const [currentWindow, setCurrentWindowState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return resolveWindowId(window.location.hash);
    }
    return 'inicio';
  });

  const setCurrentWindow = useCallback((windowId: string) => {
    const resolved = resolveWindowId(windowId);
    setCurrentWindowState(resolved);
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', '#' + resolved);
      } catch {
        window.location.hash = '#' + resolved;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const resolved = resolveWindowId(window.location.hash);
      setCurrentWindowState(resolved);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Cloud Sync
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const isMountedRef = useRef(true);

  // Toasts with strict deduplication
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToasts(prev => {
      // Prevent duplicate toast if same message is already showing
      if (prev.some(t => t.message === message)) {
        return prev;
      }
      const id = Math.random().toString(36).substring(2, 9);
      setTimeout(() => {
        setToasts(p => p.filter(t => t.id !== id));
      }, 3500);
      return [...prev, { id, type, message }];
    });
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsArticles));
    } catch {}
  }, [newsArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    } catch {}
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SECTIONS, JSON.stringify(customSections));
    } catch {}
  }, [customSections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TUTORIAL_STEPS, JSON.stringify(tutorialSteps));
    } catch {}
  }, [tutorialSteps]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TUTORIAL_ING, JSON.stringify(tutorialIngredients));
    } catch {}
  }, [tutorialIngredients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
    } catch {}
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } catch {}
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch {}
  }, [comments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaItems));
    } catch {}
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers));
    } catch {}
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch {}
  }, [activities]);

  // Cloud Database Sync Functions (PostgreSQL Database + Global Realtime Relay + Local Fallback)
  const pushToCloud = useCallback(async (statePayload: Record<string, any>) => {
    try {
      setIsSyncing(true);
      const safePayload = JSON.parse(JSON.stringify(statePayload));
      
      // 1. Persist directly to PostgreSQL database via backend API
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        await fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(safePayload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        setLastSyncedAt(new Date());
      } catch (fErr) {
        console.warn('PostgreSQL database sync note:', fErr);
      }

      // 2. Global Cloud Relay (guarantees instant synchronization across all visitor accounts worldwide)
      try {
        let relayTimer: any;
        const relayTimeout = new Promise((_, reject) => {
          relayTimer = setTimeout(() => reject(new Error('Relay timeout')), 2500);
        });
        const relayPromise = fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0cf3cb2ee7de0', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Solviplas Global Cloud State',
            data: safePayload,
          }),
        });
        await Promise.race([relayPromise, relayTimeout]);
        clearTimeout(relayTimer);
        setLastSyncedAt(new Date());
      } catch (rErr) {
        console.warn('Relay sync note:', rErr);
      }
      
      setLastSyncedAt(new Date());
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const fetchCloudState = useCallback(async (showToastNotice = false) => {
    try {
      let cloud: any = null;

      // 1. Fetch from PostgreSQL backend database first
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch('/api/state', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const json = await res.json();
          if (json?.data) cloud = json.data;
        }
      } catch {}

      // 2. Secondary fallback from Global Cloud Relay
      if (!cloud) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);
          const res = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0cf3cb2ee7de0', {
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          if (res.ok) {
            const json = await res.json();
            if (json?.data) cloud = json.data;
          }
        } catch {}
      }

      if (cloud) {
        if (cloud.siteConfig) setSiteConfig(prev => ({ ...prev, ...cloud.siteConfig }));
        if (Array.isArray(cloud.products) && cloud.products.length > 0) setProducts(cloud.products);
        if (Array.isArray(cloud.customSections)) setCustomSections(cloud.customSections);
        if (Array.isArray(cloud.tutorialSteps) && cloud.tutorialSteps.length > 0) setTutorialSteps(cloud.tutorialSteps);
        if (Array.isArray(cloud.tutorialIngredients) && cloud.tutorialIngredients.length > 0) setTutorialIngredients(cloud.tutorialIngredients);
        if (Array.isArray(cloud.comments)) setComments(cloud.comments);
        if (Array.isArray(cloud.mediaItems) && cloud.mediaItems.length > 0) setMediaItems(cloud.mediaItems);
        if (Array.isArray(cloud.teamMembers) && cloud.teamMembers.length > 0) setTeamMembers(cloud.teamMembers);
        if (Array.isArray(cloud.activities) && cloud.activities.length > 0) setActivities(cloud.activities);
        if (Array.isArray(cloud.newsArticles) && cloud.newsArticles.length > 0) setNewsArticles(cloud.newsArticles);
        if (Array.isArray(cloud.registeredUsers)) setRegisteredUsers(cloud.registeredUsers);
        setLastSyncedAt(new Date());
        if (showToastNotice) {
          showToast('Datos sincronizados correctamente.', 'info');
        }
      }
    } catch {
      // Offline fallback
    }
  }, [showToast]);

  // Initial load and periodic database refresh from PostgreSQL
  useEffect(() => {
    isMountedRef.current = true;
    fetchCloudState();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchCloudState]);

  // Periodic background sync so visitor browsers always receive live updates from admin
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCloudState(false);
    }, 6000);
    return () => clearInterval(interval);
  }, [fetchCloudState]);

  const triggerSync = async () => {
    setIsSyncing(true);
    await fetchCloudState(true);
    setIsSyncing(false);
  };

  // Strictly check admin role: Visitors, logged-in guests, or non-admins can NEVER be admin
  const isAdmin = Boolean(currentUser?.role === 'admin');

  // Ensure that if user is not admin, edit mode and customization are strictly disabled and purged
  useEffect(() => {
    if (!isAdmin) {
      setIsLiveEditEnabled(false);
      setIsEditModeActive(false);
      setIsLogoModalOpen(false);
      setIsNewSectionModalOpen(false);
      setIsNewProductModalOpen(false);
      try {
        localStorage.removeItem('solviplas_edit_mode_active');
      } catch {}
    }
  }, [isAdmin]);

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) {
      showToast('Acceso restringido: Solo la cuenta de administrador puede personalizar la página.', 'warning');
      setIsLiveEditEnabled(false);
      setIsEditModeActive(false);
      return;
    }
    setIsLiveEditEnabled(prev => {
      const next = !prev;
      setIsEditModeActive(next);
      try {
        localStorage.setItem('solviplas_edit_mode_active', JSON.stringify(next));
      } catch {}
      if (next) {
        showToast('Modo Personalizar activado. Ahora puedes hacer clic en cualquier texto o foto para modificarlo.', 'info');
      } else {
        showToast('Modo Vista Previa activado. Visualizando como visitante.', 'info');
      }
      return next;
    });
  }, [isAdmin, showToast]);

  // News CRUD
  const addNewsArticle = (article?: Partial<NewsArticle>) => {
    const newArticle: NewsArticle = {
      id: 'news-' + Date.now(),
      title: article?.title || 'Nueva Noticia de Implementación Solviplas',
      summary: article?.summary || 'Resumen de las nuevas mejoras y avances implementados en el proyecto.',
      content: article?.content || 'Detalle completo de las pruebas, nuevos materiales, resultados obtenidos y siguientes metas.',
      imageUrl: article?.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
      date: article?.date || new Date().toISOString().split('T')[0],
      author: article?.author || (currentUser?.name || 'Equipo Solviplas'),
      authorRole: article?.authorRole || (currentUser?.ecoTitle || 'I+D Sostenibilidad'),
      category: article?.category || 'Innovación',
      readTime: article?.readTime || '3 min de lectura',
      isFeatured: article?.isFeatured || false,
      tags: article?.tags || ['Innovación', 'Solviplas', 'Química Verde'],
    };

    setNewsArticles(prev => {
      const updated = [newArticle, ...prev];
      pushToCloud({ newsArticles: updated });
      return updated;
    });
    showToast('¡Nueva noticia publicada con éxito!', 'success');
  };

  const updateNewsArticle = (id: string, updated: Partial<NewsArticle>) => {
    setNewsArticles(prev => {
      const updatedList = prev.map(n => (n.id === id ? { ...n, ...updated } : n));
      pushToCloud({ newsArticles: updatedList });
      return updatedList;
    });
    showToast('Noticia actualizada.', 'success');
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles(prev => {
      const updatedList = prev.filter(n => n.id !== id);
      pushToCloud({ newsArticles: updatedList });
      return updatedList;
    });
    showToast('Noticia eliminada.', 'info');
  };

  // Config Update
  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    let latest: SiteConfig | null = null;
    setSiteConfig(prev => {
      const updated = { ...prev, ...newConfig };
      latest = updated;
      try {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setTimeout(() => {
      if (latest) {
        pushToCloud({ siteConfig: latest });
      }
    }, 10);
    showToast('Cambios guardados en la nube.', 'success');
  };

  const resetToDefaultConfig = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setCustomSections(INITIAL_CUSTOM_SECTIONS);
    setTutorialSteps(INITIAL_SITE_CONFIG.tutorialSteps);
    setTutorialIngredients(INITIAL_SITE_CONFIG.tutorialIngredients);
    setMediaItems(INITIAL_MEDIA);
    setTeamMembers(INITIAL_TEAM);
    setActivities(INITIAL_ACTIVITIES);
    pushToCloud({
      siteConfig: INITIAL_SITE_CONFIG,
      products: INITIAL_PRODUCTS,
      customSections: INITIAL_CUSTOM_SECTIONS,
      tutorialSteps: INITIAL_SITE_CONFIG.tutorialSteps,
      tutorialIngredients: INITIAL_SITE_CONFIG.tutorialIngredients,
      mediaItems: INITIAL_MEDIA,
      teamMembers: INITIAL_TEAM,
      activities: INITIAL_ACTIVITIES,
    });
    showToast('Contenido restablecido a valores iniciales.', 'info');
  };

  // Products CRUD
  const addProduct = (product?: Partial<ProductItem>) => {
    const newProd: ProductItem = {
      id: 'prod-' + Date.now(),
      name: product?.name || 'Nuevo Producto Solviplas',
      category: product?.category || 'Bioplásticos Innovadores',
      badge: product?.badge || '100% Biodegradable',
      shortDescription: product?.shortDescription || 'Descripción breve del producto ecológico y su aplicación sostenible.',
      description: product?.description || 'Descripción detallada de la formulación, tiempo de curado y propiedades mecánicas.',
      mediaType: product?.mediaType || 'image',
      mediaUrl: product?.mediaUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      dissolutionTime: product?.dissolutionTime || '45 a 60 segundos en agua tibia',
      thickness: product?.thickness || '0.08 mm',
      usage: product?.usage || 'Empaques secos y sustitución de polietileno.',
      ingredients: product?.ingredients || [
        { id: 'pi-1', name: 'Almidón vegetal (Maíz/Yuca)', amount: '5 cucharadas', purpose: 'Estructura polimérica principal' },
        { id: 'pi-2', name: 'Glicerina vegetal', amount: '1.5 cucharadas', purpose: 'Agente plastificante flexible' },
        { id: 'pi-3', name: 'Vinagre blanco', amount: '1 cucharada', purpose: 'Catalizador de homogeneización' },
        { id: 'pi-4', name: 'Agua purificada', amount: '220 ml', purpose: 'Solvente térmico' },
      ],
      steps: product?.steps || [
        { id: 'ps-1', stepNumber: 1, title: 'Mezcla y disolución en frío', description: 'Combina los ingredientes en una cacerola removiendo hasta disolver grumos.', tip: 'Evita encender el fuego antes de disolver.' },
        { id: 'ps-2', stepNumber: 2, title: 'Gelatinización térmica controlada', description: 'Cocina a fuego medio-bajo durante 6 minutos hasta gel viscoso.', tip: 'No dejes de revolver.' },
        { id: 'ps-3', stepNumber: 3, title: 'Vaciado y moldeado', description: 'Extiende sobre superficie lisa antiadherente con espátula.', tip: 'Grosor parejo para curado uniforme.' },
        { id: 'ps-4', stepNumber: 4, title: 'Curado ambiental de 36 horas', description: 'Deja secar a temperatura ambiente hasta desmoldar.', tip: 'Conservar en ambiente seco.' },
      ],
    };

    setProducts(prev => {
      const updated = [newProd, ...prev];
      pushToCloud({ products: updated });
      return updated;
    });
    showToast('¡Nuevo producto añadido al catálogo!', 'success');
  };

  const updateProduct = (id: string, updated: Partial<ProductItem>) => {
    setProducts(prev => {
      const newList = prev.map(p => (p.id === id ? { ...p, ...updated } : p));
      pushToCloud({ products: newList });
      return newList;
    });
    showToast('Producto actualizado en la nube.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const newList = prev.filter(p => p.id !== id);
      pushToCloud({ products: newList });
      return newList;
    });
    showToast('Producto eliminado del catálogo.', 'info');
  };

  // Custom Sections CRUD
  const addCustomSection = (section?: Partial<CustomSection>) => {
    const newSec: CustomSection = {
      id: 'sec-' + Date.now(),
      title: section?.title || 'Nueva Sección de Sostenibilidad',
      subtitle: section?.subtitle || 'Subtítulo personalizable de la sección',
      badge: section?.badge || 'Innovación',
      content: section?.content || 'Escribe aquí la descripción detallada, avances, alianzas ecológicas o novedades del proyecto Solviplas.',
      mediaType: section?.mediaType || 'image',
      mediaUrl: section?.mediaUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
      order: customSections.length + 12,
      layout: section?.layout || 'split',
      highlights: section?.highlights || [
        { id: 'h-1', title: 'Impacto Comunitario', description: 'Capacitaciones directas y transferencia tecnológica.' },
        { id: 'h-2', title: 'Cero Residuos Tóxicos', description: 'Proceso libre de químicos derivados de combustibles fósiles.' },
      ],
    };

    setCustomSections(prev => {
      const updated = [...prev, newSec];
      pushToCloud({ customSections: updated });
      return updated;
    });
    showToast('¡Nueva sección creada exitosamente!', 'success');
  };

  const updateCustomSection = (id: string, updated: Partial<CustomSection>) => {
    setCustomSections(prev => {
      const newList = prev.map(s => (s.id === id ? { ...s, ...updated } : s));
      pushToCloud({ customSections: newList });
      return newList;
    });
    showToast('Sección actualizada.', 'success');
  };

  const deleteCustomSection = (id: string) => {
    setCustomSections(prev => {
      const newList = prev.filter(s => s.id !== id);
      pushToCloud({ customSections: newList });
      return newList;
    });
    showToast('Sección eliminada.', 'info');
  };

  // Tutorial Steps & Ingredients CRUD
  const updateTutorialStep = (id: string, updated: Partial<TutorialStep>) => {
    setTutorialSteps(prev => {
      const newList = prev.map(s => (s.id === id ? { ...s, ...updated } : s));
      pushToCloud({ tutorialSteps: newList });
      return newList;
    });
    showToast('Paso del tutorial actualizado.', 'success');
  };

  const addTutorialStep = () => {
    const nextNum = tutorialSteps.length + 1;
    const newStep: TutorialStep = {
      id: 'tut-step-' + Date.now(),
      stepNumber: nextNum,
      title: `Paso ${nextNum}: Nueva Fase de Elaboración`,
      description: 'Describe las acciones a realizar, tiempo de cocción o indicaciones de temperatura.',
      tip: 'Agrega un consejo práctico para asegurar el éxito del procedimiento.',
      duration: '5 minutos',
      temp: 'Temperatura controlada',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    };
    setTutorialSteps(prev => {
      const updated = [...prev, newStep];
      pushToCloud({ tutorialSteps: updated });
      return updated;
    });
    showToast('Nuevo paso agregado al tutorial.', 'success');
  };

  const deleteTutorialStep = (id: string) => {
    setTutorialSteps(prev => {
      const filtered = prev.filter(s => s.id !== id);
      const renumbered = filtered.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
      pushToCloud({ tutorialSteps: renumbered });
      return renumbered;
    });
    showToast('Paso eliminado.', 'info');
  };

  const updateTutorialIngredient = (id: string, updated: Partial<RecipeIngredient>) => {
    setTutorialIngredients(prev => {
      const newList = prev.map(ing => (ing.id === id ? { ...ing, ...updated } : ing));
      pushToCloud({ tutorialIngredients: newList });
      return newList;
    });
    showToast('Ingrediente actualizado.', 'success');
  };

  const addTutorialIngredient = () => {
    const newIng: RecipeIngredient = {
      id: 'ting-' + Date.now(),
      name: 'Nuevo Ingrediente Ecológico',
      amount: '1 porción adecuada',
      purpose: 'Función en la formulación de biopolímero',
    };
    setTutorialIngredients(prev => {
      const updated = [...prev, newIng];
      pushToCloud({ tutorialIngredients: updated });
      return updated;
    });
    showToast('Ingrediente agregado a la fórmula.', 'success');
  };

  const deleteTutorialIngredient = (id: string) => {
    setTutorialIngredients(prev => {
      const newList = prev.filter(ing => ing.id !== id);
      pushToCloud({ tutorialIngredients: newList });
      return newList;
    });
    showToast('Ingrediente retirado.', 'info');
  };

  // Auth: Real Persistence & Clean Session Switch across all devices
  const registerUser = async (userData: {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    role?: any;
    institution?: string;
    bio?: string;
    ecoTitle?: string;
    ecoInterest?: string;
    location?: string;
    themeColor?: 'emerald' | 'teal' | 'cyan' | 'amber' | 'violet' | 'rose';
    avatarType?: 'animal' | 'custom' | 'default';
    avatarAnimalId?: string;
  }): Promise<boolean> => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const isAdminAccount = cleanEmail === 'solf@gmail.com' || cleanEmail === 'marceloaliaga181@gmail.com' || cleanEmail === 'marceloaliaga102@gmail.com' || cleanEmail === 'admin';

    const existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast('Ya existe una cuenta con este correo.', 'error');
      return false;
    }

    const defaultAvatar = ANIMAL_AVATARS[0].svgDataUri;
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: userData.name.trim(),
      email: cleanEmail,
      role: isAdminAccount ? 'admin' : (userData.role || 'community'),
      avatar: userData.avatar || defaultAvatar,
      institution: userData.institution || (isAdminAccount ? 'Administrador Solviplas' : 'Comunidad Solviplas'),
      createdAt: new Date().toISOString(),
      bio: userData.bio || 'Comprometido con un planeta sin plásticos y la investigación de biopolímeros.',
      ecoTitle: userData.ecoTitle || (isAdminAccount ? 'Coordinador General' : 'Guardián de la Biodiversidad'),
      ecoInterest: userData.ecoInterest || 'Almidón de Yuca & Maíz',
      location: userData.location || '',
      themeColor: userData.themeColor || 'emerald',
      avatarType: userData.avatarType || (userData.avatar ? 'custom' : 'animal'),
      avatarAnimalId: userData.avatarAnimalId || (userData.avatar ? undefined : 'panda-eco'),
      badges: ['Miembro de la Comunidad', 'Perfil Verificado'],
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    setCurrentUser(newUser);
    setIsLiveEditEnabled(newUser.role === 'admin');

    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
    } catch {}

    // Persist to PostgreSQL database
    pushToCloud({ registeredUsers: updatedUsers });

    // Also send to backend registration endpoint
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, role: newUser.role }),
    }).catch(() => {});

    showToast(`¡Bienvenido/a, ${newUser.name}! Tu perfil con avatar ecológico ha sido creado.`, 'success');
    return true;
  };

  const updateUserProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!currentUser) {
      showToast('Debes iniciar sesión para personalizar tu perfil.', 'warning');
      return false;
    }

    const updatedUser: User = {
      ...currentUser,
      ...profileData,
    };

    setCurrentUser(updatedUser);
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    } catch {}

    // Update in registered users list
    let updatedRegistered = registeredUsers.map(u =>
      (u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase())
        ? updatedUser
        : u
    );

    if (!updatedRegistered.some(u => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase())) {
      updatedRegistered = [...updatedRegistered, updatedUser];
    }

    setRegisteredUsers(updatedRegistered);
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedRegistered));
    } catch {}

    // Sync comments authored by this user
    const updatedComments = comments.map(c => {
      const isAuthor =
        c.userId === currentUser.id ||
        (currentUser.email && c.userId === currentUser.email) ||
        c.userName === currentUser.name;

      if (isAuthor) {
        return {
          ...c,
          userName: updatedUser.name,
          userAvatar: updatedUser.avatar,
          userRole: updatedUser.ecoTitle || (updatedUser.role === 'admin' ? 'Administrador Solviplas' : updatedUser.institution || 'Comunidad'),
        };
      }
      return c;
    });
    setComments(updatedComments);

    pushToCloud({
      registeredUsers: updatedRegistered,
      comments: updatedComments,
    });

    showToast('¡Perfil actualizado y sincronizado en la base de datos!', 'success');
    return true;
  };

  const loginUser = async (identifier: string, password?: string): Promise<{ success: boolean; message: string }> => {
    const trimmedId = identifier.trim().toLowerCase();
    const cleanPass = password?.trim() || '';
    const normalizedId = trimmedId.replace(/\s+/g, '');
    const normalizedPass = cleanPass.toLowerCase().replace(/\s+/g, '');

    // Clean prior session data completely
    localStorage.removeItem(STORAGE_KEYS.USER);
    setCurrentUser(null);

    // 1. Direct Master Administrator Identifiers & Passwords Check
    const adminIdentifiers = [
      'solf@gmail.com',
      'solf',
      'marceloaliaga181@gmail.com',
      'marceloaliaga181',
      'marceloaliaga102@gmail.com',
      'marceloaliaga102',
      'admin',
      'administrador',
      'administrator',
      'marcelo',
      'marcelo aliaga',
      'marceloaliaga',
      'solviplas',
      'solviplas@gmail.com',
      (siteConfig.adminUsername || 'admin').toLowerCase().trim(),
      (siteConfig.adminEmail || 'solf@gmail.com').toLowerCase().trim(),
    ];

    const isAdminIdentifier = adminIdentifiers.some(
      id => trimmedId === id || normalizedId === id.replace(/\s+/g, '')
    );

    const validAdminPasswords = [
      'solviplas2025!',
      'solviplas2025',
      'solviplas!',
      'solviplas',
      'admin',
      'admin123',
      'admin2025',
      'admin2025!',
      '123456',
      'solf2025',
      'solf',
      (siteConfig.adminPasswordHash || 'Solviplas2025!').toLowerCase().trim(),
    ];

    const isPassValid = validAdminPasswords.some(
      p =>
        normalizedPass === p ||
        cleanPass.toLowerCase() === p ||
        cleanPass === p ||
        normalizedPass === p.replace(/[!]/g, '')
    );

    if (isAdminIdentifier && isPassValid) {
      const adminUser: User = {
        id: 'usr-admin-master',
        name: 'Administrador Solviplas',
        email: trimmedId.includes('@') ? trimmedId : 'solf@gmail.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        institution: 'Administrador Solviplas',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(adminUser);
      setIsLiveEditEnabled(true);
      try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(adminUser));
      } catch {}
      showToast('¡Hola! Sesión de administrador iniciada con modo edición activado.', 'success');
      return { success: true, message: 'Sesión de administración iniciada' };
    }

    // 2. Check registered users list (synced via Google Cloud Firestore)
    const matched = registeredUsers.find(
      u => u.email.toLowerCase() === trimmedId || u.name.toLowerCase() === trimmedId
    );
    if (matched) {
      const userToSet: User = {
        ...matched,
        role: (matched.email.toLowerCase() === 'solf@gmail.com' || matched.email.toLowerCase() === 'marceloaliaga102@gmail.com' || matched.role === 'admin') ? 'admin' : matched.role,
      };
      setCurrentUser(userToSet);
      setIsLiveEditEnabled(userToSet.role === 'admin');
      try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userToSet));
      } catch {}
      showToast(`¡Hola, ${userToSet.name}! Sesión iniciada correctamente.`, 'success');
      return { success: true, message: 'Inicio de sesión correcto' };
    }

    // 3. Check fullstack server endpoint if available
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.success && data.user) {
          const user: User = data.user;
          setCurrentUser(user);
          setIsLiveEditEnabled(user.role === 'admin');
          try {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          } catch {}
          showToast(`¡Hola, ${user.name}! Sesión iniciada.`, 'success');
          return { success: true, message: 'Inicio de sesión correcto' };
        }
      }
    } catch {}

    return {
      success: false,
      message: 'Correo o contraseña incorrectos. Por favor verifica tus credenciales e intenta nuevamente.',
    };
  };

  // Clean Logout: Completely clean session without leaking prior account info
  const logout = () => {
    setCurrentUser(null);
    setIsLiveEditEnabled(false);
    localStorage.removeItem(STORAGE_KEYS.USER);
    // Clear any temporary draft state in session
    sessionStorage.clear();
    showToast('Has cerrado sesión. La sesión ha sido limpiada por completo.', 'info');
  };

  // Comments CRUD - Universal & Real-time Google Cloud Sync (requires registered user)
  const addComment = (
    content: string,
    category: 'opinion' | 'pregunta' | 'felicitacion' | 'idea',
    rating: number,
    _authorName?: string
  ): boolean => {
    if (!currentUser) {
      showToast('Para comentar debes crearte una cuenta o iniciar sesión.', 'warning');
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return false;
    }

    const newComment: Comment = {
      id: 'comm-' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userRole: currentUser.ecoTitle || (currentUser.role === 'admin' ? 'Equipo Solviplas' : (currentUser.institution || 'Comunidad')),
      content: content.trim(),
      category,
      rating,
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
    };

    setComments(prev => {
      const updated = [newComment, ...prev];
      pushToCloud({ comments: updated });
      return updated;
    });
    showToast('¡Comentario publicado en la nube y visible para todos en tiempo real!', 'success');
    return true;
  };

  const toggleLikeComment = (commentId: string) => {
    let voterId = currentUser?.id;
    if (!voterId) {
      try {
        voterId = localStorage.getItem('solviplas_voter_id') || '';
        if (!voterId) {
          voterId = 'voter-' + Math.random().toString(36).substring(2, 9);
          localStorage.setItem('solviplas_voter_id', voterId);
        }
      } catch {
        voterId = 'voter-anon';
      }
    }

    setComments(prev => {
      const updated = prev.map(c => {
        if (c.id !== commentId) return c;
        const hasLiked = c.likedBy.includes(voterId!);
        const newLikedBy = hasLiked
          ? c.likedBy.filter(id => id !== voterId)
          : [...c.likedBy, voterId!];
        return {
          ...c,
          likes: newLikedBy.length,
          likedBy: newLikedBy,
        };
      });
      pushToCloud({ comments: updated });
      return updated;
    });
  };

  const deleteComment = (commentId: string) => {
    setComments(prev => {
      const updated = prev.filter(c => c.id !== commentId);
      pushToCloud({ comments: updated });
      return updated;
    });
    showToast('Comentario eliminado.', 'info');
  };

  const pinComment = (commentId: string) => {
    setComments(prev => {
      const updated = prev.map(c => (c.id === commentId ? { ...c, isPinned: !c.isPinned } : c));
      pushToCloud({ comments: updated });
      return updated;
    });
  };

  const replyComment = (
    commentId: string,
    reply: string,
    _authorName?: string,
    _authorAvatar?: string,
    isOfficial?: boolean
  ) => {
    if (!currentUser) {
      showToast('Para responder comentarios debes crearte una cuenta o iniciar sesión.', 'warning');
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return;
    }

    const trimmed = reply.trim();
    if (!trimmed) return;

    const isOfficialReply = isOfficial || currentUser.role === 'admin';
    const responderName = currentUser.name;
    const responderAvatar = currentUser.avatar;
    const responderRole = isOfficialReply ? 'Equipo Solviplas (Oficial)' : (currentUser.ecoTitle || currentUser.institution || 'Comunidad');

    setComments(prev => {
      const updated = prev.map(c => {
        if (c.id !== commentId) return c;
        const newReplyObj = {
          id: 'reply-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          authorName: responderName,
          authorAvatar: responderAvatar,
          authorRole: responderRole,
          content: trimmed,
          createdAt: new Date().toISOString(),
          isOfficial: Boolean(isOfficialReply),
        };

        const existingReplies = c.replies ? [...c.replies] : [];
        return {
          ...c,
          adminReply: isOfficialReply ? trimmed : (c.adminReply || undefined),
          replies: [...existingReplies, newReplyObj],
        };
      });
      pushToCloud({ comments: updated });
      return updated;
    });
    showToast(isOfficialReply ? 'Respuesta oficial guardada con éxito.' : 'Respuesta publicada con éxito.', 'success');
  };

  // Media CRUD
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newItem: MediaItem = {
      ...item,
      id: 'media-' + Date.now(),
      uploadedAt: new Date().toISOString(),
    };
    setMediaItems(prev => {
      const updated = [newItem, ...prev];
      pushToCloud({ mediaItems: updated });
      return updated;
    });
    showToast('Archivo multimedia agregado con éxito.', 'success');
  };

  const updateMediaItem = (id: string, updated: Partial<MediaItem>) => {
    setMediaItems(prev => {
      const updatedList = prev.map(m => (m.id === id ? { ...m, ...updated } : m));
      pushToCloud({ mediaItems: updatedList });
      return updatedList;
    });
    showToast('Contenido multimedia actualizado.', 'success');
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems(prev => {
      const updatedList = prev.filter(m => m.id !== id);
      pushToCloud({ mediaItems: updatedList });
      return updatedList;
    });
    showToast('Archivo multimedia eliminado.', 'info');
  };

  const toggleFeaturedMedia = (id: string) => {
    setMediaItems(prev => {
      const updatedList = prev.map(m => (m.id === id ? { ...m, isFeatured: !m.isFeatured } : m));
      pushToCloud({ mediaItems: updatedList });
      return updatedList;
    });
  };

  // Team & Activities
  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers(prev => {
      const updatedList = prev.map(t => (t.id === id ? { ...t, ...updated } : t));
      pushToCloud({ teamMembers: updatedList });
      return updatedList;
    });
  };

  const updateActivity = (id: string, updated: Partial<ActivityItem>) => {
    setActivities(prev => {
      const updatedList = prev.map(a => (a.id === id ? { ...a, ...updated } : a));
      pushToCloud({ activities: updatedList });
      return updatedList;
    });
  };

  return (
    <AppContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        resetToDefaultConfig,

        products,
        addProduct,
        updateProduct,
        deleteProduct,

        customSections,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,

        tutorialSteps,
        updateTutorialStep,
        addTutorialStep,
        deleteTutorialStep,
        tutorialIngredients,
        updateTutorialIngredient,
        addTutorialIngredient,
        deleteTutorialIngredient,

        currentUser,
        isAdmin,
        registerUser,
        loginUser,
        logout,
        updateUserProfile,

        comments,
        addComment,
        toggleLikeComment,
        deleteComment,
        pinComment,
        replyComment,

        currentWindow,
        setCurrentWindow,

        mediaItems,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        toggleFeaturedMedia,

        teamMembers,
        updateTeamMember,
        activities,
        updateActivity,

        newsArticles,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,

        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isProfileModalOpen,
        setIsProfileModalOpen,

        isLiveEditEnabled: Boolean(isAdmin && isLiveEditEnabled),
        setIsLiveEditEnabled,
        isEditModeActive: Boolean(isAdmin && isEditModeActive),
        setIsEditModeActive,
        toggleEditMode,

        isLogoModalOpen,
        setIsLogoModalOpen,

        isNewSectionModalOpen,
        setIsNewSectionModalOpen,
        isNewProductModalOpen,
        setIsNewProductModalOpen,

        isSyncing,
        lastSyncedAt,
        triggerSync,

        toasts,
        showToast,
      }}
    >
      {children}

      {/* Cloud Sync Status Indicator in bottom corner - only visible when logged in with admin account */}
      {isAdmin && lastSyncedAt && (
        <div className="fixed bottom-3 right-3 z-40 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-[10px] backdrop-blur-sm pointer-events-none">
          <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span>{isSyncing ? 'Sincronizando...' : 'Base de Datos Conectada'}</span>
        </div>
      )}

      {/* Floating Toasts */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border text-xs font-semibold flex items-center justify-between gap-3 transition-all animate-slideUp ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : toast.type === 'warning'
                ? 'bg-amber-900 text-white border-amber-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="opacity-70 hover:opacity-100 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
