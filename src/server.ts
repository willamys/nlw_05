import express, {response} from "express";
import "./database";
import { routes } from "./routes";
const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log("Server is running on port 3333"));

/**
 * GET = BUSCAR
 * POST = CRIAR
 * PUT = ALTERAR
 * DELETE = APAGAR
 * PATCH = ALTERAR UMA INFORMAÇÃO ESPECIFICA
 
app.get("/", (request, response) => {
     return response.json({
        message: "Olá NLW 05",
    });
});

app.post("/users", (request, responde) => {
    return responde.json({ message: "Usuário salvo com sucesso"});
});
*/
