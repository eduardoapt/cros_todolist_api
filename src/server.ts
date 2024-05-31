import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import routes from "./routes"

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("../swaggerConfig.ts")

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use("/api", routes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  console.log(
    `Servidor funcionando. Para testar as rotas, entre em localhost:${PORT}/api-docs`
  )
})

export default app
