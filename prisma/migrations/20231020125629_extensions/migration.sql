-- CreateTable
CREATE TABLE "Extensions" (
    "id" SERIAL NOT NULL,
    "navigator" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extensions_pkey" PRIMARY KEY ("id")
);
