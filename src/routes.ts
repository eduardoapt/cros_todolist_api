import { Router } from "express"
import taskRoutes from "./routes/taskRoutes"
import userRoutes from "./routes/userRoutes"

const router = Router()

router.use("/tasks", taskRoutes)
router.use("/users", userRoutes)

export default router
