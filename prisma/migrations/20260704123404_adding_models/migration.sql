-- CreateTable
CREATE TABLE "cubes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "difficultyLevel" INTEGER NOT NULL,

    CONSTRAINT "cubes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accessories " (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "accessories _pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccessoryToCube" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccessoryToCube_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AccessoryToCube_B_index" ON "_AccessoryToCube"("B");

-- AddForeignKey
ALTER TABLE "_AccessoryToCube" ADD CONSTRAINT "_AccessoryToCube_A_fkey" FOREIGN KEY ("A") REFERENCES "accessories "("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccessoryToCube" ADD CONSTRAINT "_AccessoryToCube_B_fkey" FOREIGN KEY ("B") REFERENCES "cubes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
