import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate{
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?:string;
}

class ConnectionsService{

  private connectionRepository: Repository<Connection>;

  constructor(){
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }

  async create({socket_id, user_id, admin_id, id}: IConnectionCreate){
    
    const connection = this.connectionRepository.create({
      socket_id, user_id, admin_id, id
    });
   
    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string){
    
    const connection = this.connectionRepository.findOne({
     user_id
    });

    return connection;
  }

  async findBySocketID(socket_id: string){
    
    const connection = this.connectionRepository.findOne({
     socket_id
    });

    return connection;
  }

  async findAllWithoutAdmin(){
    
    const connection = this.connectionRepository.find({
     where: {admin_id: null},
     relations: ["user"],
    });

    return connection;
  }

  async updateAdminID(user_id: string, admin_id: string){
    const connection = await this.connectionRepository.createQueryBuilder()
    .createQueryBuilder()
    .update(Connection)
    .set({admin_id})
    .where("user_id = :user_id",{
      user_id
    }).execute();
  }

}

export{ConnectionsService}