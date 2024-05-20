-- CreateTable
CREATE TABLE "Movie" (
    "movie_id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "releaseDate" TIMESTAMP(0) NOT NULL,
    "rating" DECIMAL(3,1),
    "genre" VARCHAR NOT NULL,
    "director" VARCHAR NOT NULL,
    "created" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movie_id")
);
