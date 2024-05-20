-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" TEXT NOT NULL,
    "created" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(0),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
