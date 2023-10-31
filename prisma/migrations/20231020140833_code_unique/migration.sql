/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Extensions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Extensions_code_key" ON "Extensions"("code");
