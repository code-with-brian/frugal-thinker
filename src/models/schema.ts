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

export const activities = sqliteTable('activities', {
    id: integer('id').primaryKey(), // Unique activity ID
    resource_state: integer('resource_state'),  
    athlete_id: integer('athlete_id'), // ID of the athlete
    name: text('name').notNull(),
    distance: real('distance').notNull(), 
    moving_time: integer('moving_time').notNull(),
    elapsed_time: integer('elapsed_time').notNull(),
    total_elevation_gain: real('total_elevation_gain'), 
    type: text('type').notNull(),
    sport_type: text('sport_type'), 
    start_date: text('start_date').notNull(), 
    start_date_local: text('start_date_local').notNull(),
    timezone: text('timezone'),
    utc_offset: real('utc_offset'),
    location_city: text('location_city'), 
    location_state: text('location_state'), 
    location_country: text('location_country').notNull(),
    achievement_count: integer('achievement_count'),
    kudos_count: integer('kudos_count'),
    comment_count: integer('comment_count'),
    athlete_count: integer('athlete_count'),
    photo_count: integer('photo_count'),
    trainer: integer('trainer').notNull(),
    commute: integer('commute').notNull(),
    manual: integer('manual').notNull(),
    private: integer('private').notNull(), 
    visibility: text('visibility'),
    flagged: integer('flagged').notNull(),
    gear_id: integer('gear_id'), 
    average_speed: real('average_speed').notNull(), 
    max_speed: real('max_speed').notNull(),
    has_heartrate: integer('has_heartrate').notNull(),
    elev_high: real('elev_high'),
    elev_low: real('elev_low'),
    upload_id: integer('upload_id'),
    upload_id_str:  text('upload_id_str'),
    external_id: text('external_id'), 
    from_accepted_tag: integer('from_accepted_tag').notNull(),
    pr_count: integer('pr_count'),
    total_photo_count: integer('total_photo_count'),
    has_kudoed: integer('has_kudoed').notNull()
});
