import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getSubtasks(taskId: number | null): Promise<any[]> {
  const subtasks = await prisma.task.findMany({
    where: { parentTaskId: taskId },
    include: { subtasks: true },
  })

  const result: any[] = []

  for (const subtask of subtasks) {
    const nestedSubtasks = await getSubtasks(subtask.id)
    subtask?.subtasks.push(...nestedSubtasks)
    result.push(subtask)
  }

  return result
}

const taskService = {
  async createTask(data: any) {
    try {
      const newTask = await prisma.task.create({
        data,
      })
      return newTask
    } catch (error) {
      throw new Error("Erro ao criar uma nova task.")
    }
  },

  async getUserTasks(userId: number) {
    try {
      const userTasks = await prisma.task.findMany({
        where: { ownerId: userId, parentTaskId: null },
        include: { subtasks: true },
      })

      const result: any[] = []

      for (const task of userTasks) {
        const subtasks = await getSubtasks(task.id)
        task.subtasks.push(...subtasks)
        result.push(task)
      }

      return result
    } catch (error) {
      throw new Error("Erro ao buscar as tasks do usuário.")
    }
  },

  async updateTask(id: number, data: any) {
    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data,
      })
      return updatedTask
    } catch (error) {
      throw new Error("Erro ao atualizar a task.")
    }
  },

  async deleteTask(id: number) {
    try {
      await prisma.task.delete({
        where: { id },
      })
    } catch (error) {
      throw new Error("Erro ao deletar a task.")
    }
  },

  async getTasksByStatus(status: boolean) {
    try {
      const filteredTasks = await prisma.task.findMany({
        where: {
          status,
        },
        include: {
          subtasks: true,
        },
      })
      return filteredTasks
    } catch (error) {
      throw new Error("Erro ao buscar as tasks pelo status.")
    }
  },

  async toggleTaskStatus(taskId: number) {
    try {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      })

      if (!task) {
        throw new Error("Tarefa não encontrada.")
      }

      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          status: !task.status,
        },
      })

      return updatedTask
    } catch (error) {
      throw new Error("Erro ao alternar o status da tarefa.")
    }
  },
}

export default taskService
