/*
  Warnings:

  - You are about to drop the column `runTime` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `runtime` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runTime` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "runTime",
ADD COLUMN     "runtime" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "overview",
ADD COLUMN     "runTime" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
