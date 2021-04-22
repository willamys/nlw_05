import {Response, Request} from "express";
import {SettingsService} from "../services/SettingsService";

class SettingsController {

    async create(request : Request, response : Response) : Promise<Response>{
        const {chat, username} = request.body; //desconstrução, ou seja obter dados do body nas variáveis.

        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create({chat, username})

            return response.json(settings);

        } catch (err) {
            return response
                .status(400)
                .json({message: err.message});
        }
    }

}

export {
    SettingsController
}