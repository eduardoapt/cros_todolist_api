import { Request, Response } from "express"
import userService from "../services/userService"
import Joi, { Schema } from "joi"

const userController = {
  async createUser(req: Request, res: Response) {
    const schema: Schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }
    const { name, email, password } = req.body

    try {
      const newUser = await userService.createUser(name, email, password)
      res.status(201).json(newUser)
    } catch (error: unknown) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao tentar criar usuário.",
      })
    }
  },

  async loginUser(req: Request, res: Response) {
    const schema: Schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { email, password } = req.body

    try {
      const token = await userService.loginUser(email, password)
      res.json({ token })
    } catch (error: unknown) {
      res.status(401).json({
        error: error instanceof Error ? error.message : "Erro ao fazer login.",
      })
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params

    try {
      await userService.deleteUser(Number(id))
      res.json({ message: "Usuário deletado com sucesso." })
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar o usuário." })
    }
  },
}

export default userController
