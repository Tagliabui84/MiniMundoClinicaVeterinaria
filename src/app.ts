import express from "express";
import usuarioRoutes from "./routes/usuario.routes";
import clienteRoutes from "./routes/cliente.routes";
import animalRoutes from "./routes/animal.routes";
import veterinarioRoutes from "./routes/veterinario.routes";
import consultaRoutes from "./routes/consulta.routes";
import prontuarioRoutes from "./routes/prontuario.routes";

const app = express();
app.use(express.json());

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/animais", animalRoutes);
app.use("/veterinarios", veterinarioRoutes);
app.use("/consultas", consultaRoutes);
app.use("/prontuarios", prontuarioRoutes);

export default app;
