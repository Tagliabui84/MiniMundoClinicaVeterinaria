import "express-async-errors";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import usuarioRoutes from "./routes/usuario.routes";
import clienteRoutes from "./routes/cliente.routes";
import animalRoutes from "./routes/animal.routes";
import veterinarioRoutes from "./routes/veterinario.routes";
import consultaRoutes from "./routes/consulta.routes";
import prontuarioRoutes from "./routes/prontuario.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());

// Documentação interativa da API (Swagger UI)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/animais", animalRoutes);
app.use("/veterinarios", veterinarioRoutes);
app.use("/consultas", consultaRoutes);
app.use("/prontuarios", prontuarioRoutes);

// Precisa ser o ÚLTIMO app.use() - é aqui que os erros lançados
// (ex: AppError, erros do Prisma) são capturados e transformados em resposta JSON.
app.use(errorHandler);

export default app;
