-- CreateTable
CREATE TABLE "Monkey" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monkey_pkey" PRIMARY KEY ("id")
);
