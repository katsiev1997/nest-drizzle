import { index, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { comments } from './comments.schema';
import { usersToGroups } from './groups.schema';
import { posts } from './posts.schema';
import { profileInfo } from './profile-info.schema';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (t) => ({
    idIndex: index('id_idx').on(t.id),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  comments: many(comments),
  posts: many(posts),
  profileInfo: one(profileInfo),
  usersToGroups: many(usersToGroups),
}));
