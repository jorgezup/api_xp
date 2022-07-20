import { Request, Response } from "express";

import { IClientLogin, IClientRequest } from "../interfaces/client.interface";
import { ClientService } from "../services/client.service";

export class ClientController {
  async create(req: Request, res: Response): Promise<Response> {
    const client: IClientRequest = req.body;

    const service = new ClientService();

    const result = await service.createClient(client);

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.json(result);
  }
  async login(req: Request, res: Response): Promise<Response> {
    const { codClient, password }: IClientLogin = req.body;

    const service = new ClientService();

    const result = await service.loginClient({ codClient, password });

    if (result instanceof Error) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({ token: result });
  }
}
