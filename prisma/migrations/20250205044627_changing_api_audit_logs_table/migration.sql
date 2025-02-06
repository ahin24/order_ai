/*
  Warnings:

  - You are about to drop the `apiAuditLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TokenTypes" AS ENUM ('Refresh_token');

-- DropTable
DROP TABLE "apiAuditLogs";

-- CreateTable
CREATE TABLE "ApiAuditLog" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "trigger_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_type" "DeviceTypes" NOT NULL DEFAULT 'Web',
    "response_time" TEXT NOT NULL,
    "meta_data" JSONB NOT NULL,

    CONSTRAINT "ApiAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "type" "TokenTypes" NOT NULL DEFAULT 'Refresh_token',
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
