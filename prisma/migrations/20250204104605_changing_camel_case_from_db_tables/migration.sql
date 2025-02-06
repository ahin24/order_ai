-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "DeviceTypes" AS ENUM ('Web', 'Mobile');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role" "Roles" NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activityTrack" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_type" "DeviceTypes" NOT NULL,

    CONSTRAINT "activityTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
