/*
  Warnings:

  - You are about to drop the column `name` on the `department` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "department" DROP COLUMN "name",
ADD COLUMN     "divisi" TEXT;
