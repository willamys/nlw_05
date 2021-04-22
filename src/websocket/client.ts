import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  
  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const {email, text} = params;

    const usersExists = await usersService.findByEmail(email);
    
    if(!usersExists){
      const user = await usersService.create(email);
      await connectionsService.create({
        socket_id,
        user_id: user.id,
      })
    }else{
      const connection =  await connectionsService.findByUserId(usersExists.id);

      if(!connection){
      await connectionsService.create({
        socket_id,
        user_id: usersExists.id,
      })
    }else{
      connection.socket_id = socket_id;
      await connectionsService.create(connection); 
    }
  }
  });
});

