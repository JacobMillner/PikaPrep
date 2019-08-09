CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "username" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "created_at" datetime
);

CREATE TABLE "mealEntries" (
  "id" int PRIMARY KEY,
  "meal_date" date,
  "created_by" int,
  "created_at" datetime,
  "meal_id" int,
  "user_id" int
);

CREATE TABLE "meals" (
  "id" int PRIMARY KEY,
  "name" varchar UNIQUE,
  "created_by" int,
  "description" varchar,
  "photo_url" varchar,
  "recipe_url" varchar UNIQUE,
  "calories" int,
  "carbs" int,
  "fat" int,
  "protein" int,
  "servings" int,
  "cooking_time" int,
  "created_at" datetime
);

CREATE TABLE "userMeals" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "meal_id" int
);

CREATE TABLE "userMealEntries" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "mealEntry_id" int
);

ALTER TABLE "mealEntries" ADD FOREIGN KEY ("meal_id") REFERENCES "meals" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "userMeals" ("user_id");

ALTER TABLE "meals" ADD FOREIGN KEY ("id") REFERENCES "userMeals" ("meal_id");

ALTER TABLE "userMealEntries" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "mealEntries" ADD FOREIGN KEY ("id") REFERENCES "userMealEntries" ("mealEntry_id");