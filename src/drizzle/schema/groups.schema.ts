import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { relations } from 'drizzle-orm';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('title').notNull(),
});

export const usersToGroups = pgTable(
  'user_to_groups',
  {
    userId: integer('user_id').references(() => users.id),
    groupId: integer('group_id').references(() => groups.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: index('user_id_idx').on(table.userId),
  }),
);

export const usersToGrupsRelations = relations(usersToGroups, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
}));
