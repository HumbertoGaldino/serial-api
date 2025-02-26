-- AlterTable
ALTER TABLE "CastTvShow" ADD COLUMN     "isWishList" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isFavorite" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "isWishList" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isFavorite" SET DEFAULT false;
