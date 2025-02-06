/*
  Warnings:

  - You are about to drop the column `device_id` on the `apiAuditLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "apiAuditLogs" DROP COLUMN "device_id";
