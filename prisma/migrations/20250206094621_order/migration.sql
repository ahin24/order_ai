-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('Pending', 'Paid', 'Cancelled');

-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'Supplier';

-- CreateTable
CREATE TABLE "Productcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Productcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImgVideos" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ProductImgVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "order_status" "Order_Status" NOT NULL DEFAULT 'Pending',
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "invoice_url" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImgVideos" ADD CONSTRAINT "ProductImgVideos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
