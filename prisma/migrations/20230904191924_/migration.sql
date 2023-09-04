/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_name_key" ON "cards"("userId", "name");
