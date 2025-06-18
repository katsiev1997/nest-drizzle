import { integer, jsonb, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const profileInfo = pgTable('profile_info', {
  id: serial('id').primaryKey(),
  metadata: jsonb('metadata'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});
