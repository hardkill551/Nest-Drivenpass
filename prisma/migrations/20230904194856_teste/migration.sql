/*
  Warnings:

  - Made the column `userId` on table `cards` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userId_fkey";

-- DropIndex
DROP INDEX "cards_userId_name_key";

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
