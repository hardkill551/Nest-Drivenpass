/*
  Warnings:

  - Changed the type of `category` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "category",
ADD COLUMN     "category" BOOLEAN NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" BOOLEAN NOT NULL;
