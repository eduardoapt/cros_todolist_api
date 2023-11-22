/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários
 */

import { Router } from "express"
import userController from "../controllers/userController"

const router = Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com nome, e-mail e senha.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '400':
 *         description: Erro nos dados fornecidos
 *       '500':
 *         description: Erro ao criar o usuário
 */
router.post("/register", userController.createUser)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Faz login do usuário
 *     description: Faz login do usuário com e-mail e senha.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login bem-sucedido
 *       '400':
 *         description: Erro nos dados fornecidos
 *       '401':
 *         description: Credenciais inválidas
 */
router.post("/login", userController.loginUser)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     description: Deleta um usuário com base no ID fornecido.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do usuário a ser deletado
 *     responses:
 *       '200':
 *         description: Usuário deletado com sucesso
 *       '500':
 *         description: Erro ao deletar o usuário
 */
router.delete("/:id", userController.deleteUser)

export default router
