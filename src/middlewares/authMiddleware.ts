import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]

  try {
    if (!token) {
      throw new Error("Token de autenticação não fornecido.")
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string)

    if (!decoded || !decoded.userId) {
      throw new Error("Falha na autenticação do token.")
    }

    req.headers.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ error: error })
  }
}
