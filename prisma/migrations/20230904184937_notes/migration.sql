-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_name_key" ON "notes"("userId", "name");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
