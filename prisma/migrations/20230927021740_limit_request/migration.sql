/*
  Warnings:

  - You are about to drop the column `limit` on the `User` table. All the data in the column will be lost.
  - Added the required column `limitRequest` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "githubuser" TEXT NOT NULL,
    "limitRequest" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "firstname", "githubuser", "id", "lastname", "password", "updatedAt", "username") SELECT "createdAt", "email", "firstname", "githubuser", "id", "lastname", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_githubuser_key" ON "User"("githubuser");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
