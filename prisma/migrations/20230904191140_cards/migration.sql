-- CreateEnum
CREATE TYPE "CategoryCard" AS ENUM ('FISIC', 'VIRTUAL');

-- CreateEnum
CREATE TYPE "TypeCard" AS ENUM ('DEBIT', 'CREDIT', 'BOTH');

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "printedName" TEXT NOT NULL,
    "securyCode" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "category" "CategoryCard" NOT NULL,
    "type" "TypeCard" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
