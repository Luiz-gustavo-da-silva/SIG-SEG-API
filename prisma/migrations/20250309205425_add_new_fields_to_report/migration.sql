/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `Reports` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Occurrences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Occurrences" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "contactInfo",
ADD COLUMN     "CPF" TEXT,
ADD COLUMN     "UFReport" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressReport" TEXT,
ADD COLUMN     "cityReport" TEXT,
ADD COLUMN     "countryReport" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "telephone" TEXT;
