CREATE TABLE `activities` (
	`id` integer PRIMARY KEY NOT NULL,
	`resource_state` integer,
	`athlete_id` integer,
	`name` text NOT NULL,
	`distance` real NOT NULL,
	`moving_time` integer NOT NULL,
	`elapsed_time` integer NOT NULL,
	`total_elevation_gain` real,
	`type` text NOT NULL,
	`sport_type` text,
	`start_date` text NOT NULL,
	`start_date_local` text NOT NULL,
	`timezone` text,
	`utc_offset` real,
	`location_city` text,
	`location_state` text,
	`location_country` text NOT NULL,
	`achievement_count` integer,
	`kudos_count` integer,
	`comment_count` integer,
	`athlete_count` integer,
	`photo_count` integer,
	`trainer` integer NOT NULL,
	`commute` integer NOT NULL,
	`manual` integer NOT NULL,
	`private` integer NOT NULL,
	`visibility` text,
	`flagged` integer NOT NULL,
	`gear_id` integer,
	`average_speed` real NOT NULL,
	`max_speed` real NOT NULL,
	`has_heartrate` integer NOT NULL,
	`elev_high` real,
	`elev_low` real,
	`upload_id` integer,
	`upload_id_str` text,
	`external_id` text,
	`from_accepted_tag` integer NOT NULL,
	`pr_count` integer,
	`total_photo_count` integer,
	`has_kudoed` integer NOT NULL
);
