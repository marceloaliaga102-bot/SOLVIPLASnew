export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher' | 'parent' | 'community';
  avatar: string;
  institution?: string;
  createdAt: string;
  // Perfil personalizable y avatares de animalitos
  bio?: string;
  ecoTitle?: string;
  ecoInterest?: string;
  location?: string;
  themeColor?: 'emerald' | 'teal' | 'cyan' | 'amber' | 'violet' | 'rose';
  avatarType?: 'animal' | 'custom' | 'default';
  avatarAnimalId?: string;
  badges?: string[];
}

export interface CommentReply {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
  isOfficial?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  date: string;
  author: string;
  authorRole?: string;
  category: string;
  readTime?: string;
  isFeatured?: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  content: string;
  category: 'opinion' | 'pregunta' | 'felicitacion' | 'idea';
  rating: number; // 1 - 5
  likes: number;
  likedBy: string[];
  isPinned?: boolean;
  createdAt: string;
  adminReply?: string;
  replies?: CommentReply[];
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  description: string;
  url: string; // Base64 or URL
  thumbnailUrl?: string;
  category: 'taller' | 'proceso' | 'prototipo' | 'resultados' | 'documental';
  uploadedAt: string;
  isFeatured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  description: string;
  avatar: string;
}

export interface ActivityItem {
  id: string;
  objectiveId: number;
  activityCode: string;
  name: string;
  description: string;
  months: string[];
  responsible: string;
  status: 'completado' | 'en_proceso' | 'planificado';
}

export interface SectionConfig {
  id: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  order: number;
}

export interface TutorialStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  tip: string;
  duration: string;
  temp: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: string;
  purpose: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  shortDescription: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  dissolutionTime: string;
  thickness: string;
  usage: string;
  ingredients: {
    id: string;
    name: string;
    amount: string;
    purpose: string;
  }[];
  steps: {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    tip?: string;
  }[];
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  content: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  order: number;
  layout?: 'split' | 'cards' | 'banner';
  highlights?: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface SiteConfig {
  // General Info & Brand Identity
  siteName: string;
  tagline: string;
  organization: string;
  subOrganization: string;
  institutionTarget: string;
  location: string;
  year: string;

  // Customizable Logo & Brand Header
  logoUrl?: string;
  logoIcon?: string;
  logoBadge?: string;
  logoSubtitle?: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroMediaType?: 'image' | 'video';
  heroMediaUrl?: string;
  heroCtaPrimaryText?: string;
  heroCtaSecondaryText?: string;
  heroCtaTertiaryText?: string;
  heroTrust1?: string;
  heroTrust2?: string;
  heroTrust3?: string;

  // Key Statistics
  stats: {
    beneficiarios: number;
    beneficiariosLabel: string;
    presupuesto: string;
    presupuestoLabel: string;
    reduccionHuella: string;
    reduccionHuellaLabel: string;
    adopcionPostest: string;
    adopcionLabel: string;
  };

  heroFeature1?: string;
  heroFeature2?: string;
  heroFeature3?: string;

  // Inicio Modules section
  modulesBadge?: string;
  modulesTitle?: string;
  modulesDescription?: string;

  // Project Overview Section
  overviewBadge?: string;
  overviewTitle?: string;
  overviewAudienceTitle?: string;
  overviewAudienceDesc?: string;
  overviewAudienceDescription?: string;
  overviewAudienceScope?: string;
  overviewCircularTitle?: string;
  overviewCircularDescription?: string;
  overviewStatPlasticTime?: string;
  overviewStatPlasticLabel?: string;
  overviewStatSolviplasTime?: string;
  overviewStatSolviplasLabel?: string;
  overviewObjectiveTitle?: string;
  overviewObjectiveParticipants?: string;
  overviewScienceBadge?: string;
  overviewScienceTitle?: string;
  overviewScienceDesc?: string;
  overviewStat1Number?: string;
  overviewStat1Label?: string;
  overviewStat2Number?: string;
  overviewStat2Label?: string;

  // Tutorial Section Config
  tutorialBadge: string;
  tutorialTitle: string;
  tutorialSubtitle: string;
  tutorialDescription: string;
  tutorialMediaType: 'image' | 'video';
  tutorialMediaUrl: string;
  tutorialSteps: TutorialStep[];
  tutorialIngredients: RecipeIngredient[];

  // Products Section Config
  productsBadge: string;
  productsTitle: string;
  productsSubtitle: string;
  productsDescription: string;

  // Sections config
  sections: Record<string, SectionConfig>;

  // Project texts & Problem/Objective Tree
  problemBadge?: string;
  problemTitle?: string;
  treeProblemTitle?: string;
  treeProblemConsequences?: { title: string; desc: string }[];
  treeProblemCentral?: string;
  treeProblemCauses?: { title: string; desc: string }[];
  problemText: string;
  problemSubtext: string;
  problemCentralTitle?: string;
  problemCentralText?: string;
  problemEffects?: { title: string; desc: string }[];
  problemCauses?: { title: string; desc: string }[];

  objectiveBadge?: string;
  objectiveTitle?: string;
  treeObjectiveTitle?: string;
  treeObjectiveEffects?: { title: string; desc: string }[];
  treeObjectiveCentral?: string;
  treeObjectiveMeans?: { title: string; desc: string }[];
  objectiveCentralTitle?: string;
  objectiveCentralText?: string;
  objectiveEffects?: { title: string; desc: string }[];
  objectiveMeans?: { title: string; desc: string }[];

  solutionText: string;
  generalObjective: string;
  odsGoals: {
    number: number;
    title: string;
    description: string;
    tip?: string;
  }[];

  // Timeline Section
  timelineBadge?: string;
  timelineTitle?: string;
  timelineSubtitle?: string;

  // Recipe and materials (General lab)
  recipeBadge?: string;
  recipeTitle?: string;
  recipeSubtitle?: string;
  recipeStepsTitle?: string;
  recipeIngredients: RecipeIngredient[];
  recipeSteps: {
    stepNumber: number;
    title: string;
    description: string;
    tip: string;
  }[];

  // Gallery & Results
  galleryBadge?: string;
  galleryTitle?: string;
  gallerySubtitle?: string;
  resultsBadge?: string;
  resultsTitle?: string;
  resultsSubtitle?: string;
  resultsHighlightTitle?: string;
  resultsHighlightDescription?: string;
  resultsFindingBadge?: string;
  resultsFindingTitle?: string;
  resultsFindingDesc?: string;
  resultsBeforePercent?: string;
  resultsBeforeLabel?: string;
  resultsAfterPercent?: string;
  resultsAfterLabel?: string;

  // Team Section
  teamBadge?: string;
  teamTitle?: string;
  teamSubtitle?: string;

  // Community Section
  communityBadge?: string;
  communityTitle?: string;
  communitySubtitle?: string;
  commentsTitle?: string;
  commentsSubtitle?: string;

  // Footer & Institutional
  footerCommitmentTitle?: string;
  footerCommitments?: string[];
  footerReferencesTitle?: string;
  footerReferences?: string[];
  footerCopyrightText?: string;

  // Admin Credentials Config
  adminUsername: string;
  adminEmail: string;
  adminPasswordHash: string;
}
