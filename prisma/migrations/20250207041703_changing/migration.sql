/*
  Warnings:

  - You are about to drop the `Productcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('Pending', 'Paid', 'Failed');

-- DropTable
DROP TABLE "Productcategory";

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "payment_id" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "discount_amount" TEXT NOT NULL,
    "subtotal_amount" TEXT NOT NULL,
    "status" "payment_status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
