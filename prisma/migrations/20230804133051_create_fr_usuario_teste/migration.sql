-- CreateTable
CREATE TABLE "fr_usuario" (
    "usr_codigo" SERIAL NOT NULL,
    "usr_login" TEXT NOT NULL,
    "usr_senha" TEXT NOT NULL,

    CONSTRAINT "fr_usuario_pkey" PRIMARY KEY ("usr_codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "fr_usuario_usr_login_key" ON "fr_usuario"("usr_login");
