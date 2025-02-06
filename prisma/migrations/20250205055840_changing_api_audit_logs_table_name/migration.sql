/*
  Warnings:

  - You are about to drop the `ApiAuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApiAuditLog";

-- CreateTable
CREATE TABLE "ProAuditLog" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "trigger_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_type" "DeviceTypes" NOT NULL DEFAULT 'Web',
    "response_time" TEXT NOT NULL,
    "meta_data" JSONB NOT NULL,

    CONSTRAINT "ProAuditLog_pkey" PRIMARY KEY ("id")
);
