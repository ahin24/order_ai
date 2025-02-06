/*
  Warnings:

  - You are about to drop the `activityTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activityTrack" DROP CONSTRAINT "activityTrack_user_id_fkey";

-- DropTable
DROP TABLE "activityTrack";

-- CreateTable
CREATE TABLE "apiAuditLogs" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "trigger_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_type" "DeviceTypes" NOT NULL DEFAULT 'Web',
    "response_time" TEXT NOT NULL,
    "meta_data" JSONB NOT NULL,

    CONSTRAINT "apiAuditLogs_pkey" PRIMARY KEY ("id")
);
