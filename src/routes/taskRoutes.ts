/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operações relacionadas às tarefas
 */

import { Router } from "express"
import taskController from "../controllers/taskController"
import { authenticateJWT } from "../middlewares/authMiddleware"

const router = Router()

router.use(authenticateJWT)

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa com título, descrição, status e opcionalmente uma tarefa pai.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: boolean
 *               parentTaskId:
 *                 type: number
 *             required:
 *               - titulo
 *     responses:
 *       '201':
 *         description: Tarefa criada com sucesso
 *       '400':
 *         description: Erro nos dados fornecidos
 *       '500':
 *         description: Erro ao criar a tarefa
 */
router.post("/", taskController.createTask)

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtém todas as tarefas do usuário
 *     description: Obtém todas as tarefas do usuário autenticado.
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: Lista de tarefas obtida com sucesso
 *       '500':
 *         description: Erro ao buscar as tarefas
 */
router.get("/", taskController.getUserTasks)

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     description: Atualiza uma tarefa com base no ID fornecido.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: boolean
 *               parentTaskId:
 *                 type: number
 *             required:
 *               - titulo
 *               - descricao
 *               - status
 *               - parentTaskId
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso
 *       '400':
 *         description: Erro nos dados fornecidos
 *       '500':
 *         description: Erro ao atualizar a tarefa
 */
router.put("/:id", taskController.updateTask)

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa existente
 *     description: Deleta uma tarefa com base no ID fornecido.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa deletada com sucesso
 *       '500':
 *         description: Erro ao deletar a tarefa
 */
router.delete("/:id", taskController.deleteTask)

/**
 * @swagger
 * /api/tasks/status:
 *   get:
 *     summary: Obtém tarefas filtradas por status
 *     description: Obtém tarefas filtradas com base no status fornecido.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         description: Status a ser filtrado (true ou false)
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: Lista de tarefas filtrada obtida com sucesso
 *       '400':
 *         description: Status inválido fornecido
 *       '500':
 *         description: Erro ao buscar as tarefas pelo status
 */
router.get("/status", taskController.getTasksByStatus)

/**
 * @swagger
 * /api/tasks/{id}/toggle:
 *   patch:
 *     summary: Alterna o status de uma tarefa
 *     description: Alterna o status de uma tarefa com base no ID fornecido.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa para alternar o status
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Status da tarefa alternado com sucesso
 *       '500':
 *         description: Erro ao alternar o status da tarefa
 */
router.patch("/:id/toggle", taskController.toggleTaskStatus)

export default router
