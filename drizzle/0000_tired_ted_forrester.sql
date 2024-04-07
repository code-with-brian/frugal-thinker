CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`balance` real NOT NULL,
	`targetEndDate` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `burndownRates` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`rate` real NOT NULL,
	`debtId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` integer PRIMARY KEY NOT NULL,
	`amount` real NOT NULL,
	`date` text NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`accountId` integer NOT NULL,
	`debtId` integer
);
