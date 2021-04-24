import {io} from "../http";
import {ConnectionsService} from "../services/ConnectionsService";
import {UsersService} from "../services/UsersService";
import {MessagesService} from "../services/MessagesService";

interface IParams {
    text: string,
    email: string
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();
    let user_id = null;

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const {text, email} = params as IParams;
        const usersExists = await usersService.findByEmail(email);

        if (!usersExists) {
            const user = await usersService.create(email);
            await connectionsService.create({socket_id, user_id: user.id});
            user_id = user.id;
        } else {
            user_id = usersExists.id;
            const connection = await connectionsService.findByUserId(usersExists.id);

            if (!connection) {
                await connectionsService.create({socket_id, user_id: usersExists.id})
            } else {
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
        }
        await messagesService.create({text, user_id});

        //recuperando as messagens do usuário cliente
        const allMessages = await messagesService.listByUser(user_id);
        //emitir o evento
        socket.emit("client_list_all_messages", allMessages);

        const allUsers = await connectionsService.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allUsers);
    });

    socket.on("client_send_to_admin", async (params) => {
        const {text, socket_admin_id} = params;
        const socket_id = socket.id;
        const { user_id } = await connectionsService.findBySocketID(socket_id);
        const user = await usersService.findById(user_id);

        //salvar mensagem no banco
        const message = await messagesService.create({
          text,
          user_id
        });
        //enviar mesg para o atentende
        io.to(socket_admin_id).emit("admin_receive_message",{
          message,
          socket_id,
          email: user.email
        });
    });
});
