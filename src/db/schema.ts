import { pgTable, text, serial, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// 1. Users table (Firebase Auth UID + profile information)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  role: text('role').default('community').notNull(),
  avatar: text('avatar'),
  institution: text('institution'),
  bio: text('bio'),
  ecoTitle: text('eco_title'),
  location: text('location'),
  themeColor: text('theme_color').default('emerald'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Global Site State table (Stores synchronized application state)
export const siteState = pgTable('site_state', {
  key: text('key').primaryKey(), // e.g., 'main'
  stateJson: text('state_json').notNull(), // JSON payload string
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Products Catalog table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  badge: text('badge'),
  shortDescription: text('short_description'),
  description: text('description'),
  mediaType: text('media_type').default('image'),
  mediaUrl: text('media_url'),
  dissolutionTime: text('dissolution_time'),
  thickness: text('thickness'),
  usage: text('usage'),
  ingredientsJson: text('ingredients_json'),
  stepsJson: text('steps_json'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. Custom Canva Sections table
export const customSections = pgTable('custom_sections', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  badge: text('badge'),
  content: text('content'),
  mediaType: text('media_type').default('image'),
  mediaUrl: text('media_url'),
  order: integer('order').default(0),
  layout: text('layout').default('split'),
  highlightsJson: text('highlights_json'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 5. Community Comments table
export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(),
  userAvatar: text('user_avatar'),
  userRole: text('user_role'),
  content: text('content').notNull(),
  category: text('category').default('opinion').notNull(),
  rating: integer('rating').default(5).notNull(),
  likes: integer('likes').default(0).notNull(),
  likedByJson: text('liked_by_json'),
  isPinned: boolean('is_pinned').default(false),
  repliesJson: text('replies_json'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Media Gallery Items table
export const mediaItems = pgTable('media_items', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').default('image').notNull(),
  url: text('url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  category: text('category'),
  featured: boolean('featured').default(false),
  uploadedAt: timestamp('updated_at').defaultNow(),
});
