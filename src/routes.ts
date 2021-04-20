import {Router} from "express";
import {getCustomRepository} from "typeorm";
import {SettingsRepository} from "./repositories/SettingsRepository";

const routes = Router();
/**
 * Tipos de paramentros
 * Routes Params => Paramentros de rotas
 *  http://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 * http://localhost:3333/settings/1?search=algumacoisa
 * Body params => Json
 *
 * {
 * }
 * */

routes.post("/settings", async (request, response) => {
    const {chat, username} = request.body; //desconstrução, ou seja obter dados do body nas variáveis.

    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({chat, username})

    await settingsRepository.save(settings);

    return response.json(settings);
});

export {
    routes
};