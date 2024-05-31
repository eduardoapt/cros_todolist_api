import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const userService = {
  async createUser(name: string, email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return newUser
      } else {
        throw new Error("Erro ao criar usuário. Tente outro e-mail.")
      }
    } catch (error) {
      throw new Error("Erro no servidor ao criar usuárip.")
    }
  },

  async loginUser(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        throw new Error("Usuário não encontrado.")
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        throw new Error("Senha incorreta.")
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "100h",
        }
      )
      return { token }
    } catch (error) {
      throw new Error("Erro ao autenticar usuário.")
    }
  },

  async deleteUser(id: number) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new Error("Erro ao deletar o usuário.")
    }
  },
}

export default userService
