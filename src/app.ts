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

app.get("/", (req, res) => {
    res.json({mensagem: "VetCare API está no ar!"});
});

app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: { url: "/api-docs/swagger.json" },
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js"
  ]
}));


app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/animais", animalRoutes);
app.use("/veterinarios", veterinarioRoutes);
app.use("/consultas", consultaRoutes);
app.use("/prontuarios", prontuarioRoutes);

app.use(errorHandler);

export default app;
