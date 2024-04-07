import { text, sqliteTable, integer, real } from 'drizzle-orm/sqlite-core';

export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  balance: real('balance').notNull(),
  interestRate: real('interestRate').notNull(),
  targetEndDate: text('targetEndDate').notNull(),
});

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  amount: real('amount').notNull(),
  date: text('date').notNull(), // Stored as text in "YYYY-MM-DD"
  type: text('type').notNull(),
  description: text('description').notNull(),
  accountId: integer('accountId').notNull(),
});