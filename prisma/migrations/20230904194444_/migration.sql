/*
  Warnings:

  - Changed the type of `category` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userId_fkey";

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "userId" DROP NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "CategoryCard" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TypeCard" NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
