import express, {request, response} from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import  path  from "path";

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname,"..", "public"))); //onde estão os arquivos publicos
app.set("views", path.join(__dirname, "..", "public"));// onde estão as páginas front
app.engine("html", require("ejs").renderFile); //node usa extensão de front ejs
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
});

const http = createServer(app); //protocolo http
const io = new Server(http);// protocolo websocket

//estabelecer a conexão via socket pelo cliente
io.on("connection", (socket: Socket) =>{ 
    console.log("Conectou-se", socket.id);
});

app.use(express.json());

app.use(routes);

export{ http, io};