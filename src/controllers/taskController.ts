import { Request, Response } from "express"
import taskService from "../services/taskService"
import Joi, { Schema } from "joi"

const taskController = {
  async createTask(req: Request, res: Response) {
    const schema: Schema = Joi.object({
      titulo: Joi.string().required(),
      descricao: Joi.string(),
      status: Joi.boolean(),
      parentTaskId: Joi.number(),
    })

    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }
    const { titulo, descricao, status, parentTaskId } = req.body
    const { userId } = req.headers

    try {
      const newTask = await taskService.createTask({
        titulo,
        descricao: descricao ?? "",
        status: status ?? false,
        ownerId: userId,
        parentTaskId: parentTaskId ?? null,
      })

      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar a task." })
    }
  },

  async getUserTasks(req: Request, res: Response) {
    const { userId } = req.headers

    try {
      const userTasks = await taskService.getUserTasks(Number(userId))
      res.json(userTasks)
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as tasks." })
    }
  },

  async updateTask(req: Request, res: Response) {
    const schema: Schema = Joi.object({
      titulo: Joi.string().required(),
      descricao: Joi.string().required(),
      status: Joi.boolean().required(),
      parentTaskId: Joi.number().required(),
    })

    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }
    const taskId = Number(req.params.id)
    const { titulo, descricao, status, parentTaskId } = req.body

    try {
      const updatedTask = await taskService.updateTask(taskId, {
        titulo,
        descricao,
        status,
        parentTaskId,
      })

      res.json(updatedTask)
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar a task." })
    }
  },

  async deleteTask(req: Request, res: Response) {
    const taskId = Number(req.params.id)

    try {
      await taskService.deleteTask(taskId)
      res.json({ message: "Task deletada com sucesso." })
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar a task." })
    }
  },

  async getTasksByStatus(req: Request, res: Response) {
    const { status } = req.query

    if (status !== "true" && status !== "false") {
      return res
        .status(400)
        .json({ error: "Valor inválido para o status. Use true ou false." })
    }

    try {
      const filteredTasks = await taskService.getTasksByStatus(
        status === "true"
      )
      res.json(filteredTasks)
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as tasks pelo status." })
    }
  },

  async toggleTaskStatus(req: Request, res: Response) {
    const taskId = Number(req.params.id)

    try {
      const updatedTask = await taskService.toggleTaskStatus(taskId)
      res.json(updatedTask)
    } catch (error) {
      res.status(500).json({ error: "Erro ao alternar o status da task." })
    }
  },
}

export default taskController
