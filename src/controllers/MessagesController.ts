import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";



class MessagesController{
    async create(request: Request, response: Response){
      const {admin_id, text, user_id } = request.body;
      const messagesServices = new MessagesService();
      const message = await messagesServices.create({
        admin_id,
        text,
        user_id
      });
      return response.json(message);
    }

    //localhost:3333/messages/id
    async showByUser(request: Request, response: Response){
      const { id }  = request.params;
      const messagesServices = new MessagesService();
      const list = await messagesServices.listByUser(id);
      return response.json(list);
    }

    async deleteById(request: Request, response: Response){
      const { id }  = request.params;
      const messagesServices = new MessagesService();
      const message = await messagesServices.deleteById(id);
      return response.json(message);
    }
}


export{MessagesController}