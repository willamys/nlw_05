import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController{

  async create(request: Request, response: Response) {
    const {chat, username} = request.body; //desconstrução, ou seja obter dados do body nas variáveis.

    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({chat, username})

    await settingsRepository.save(settings);

    return response.json(settings);
  }

}

export {SettingsController}