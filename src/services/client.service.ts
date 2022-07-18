import { Client } from "../database/models/entities/Client";
import { IClient } from "../interfaces/client.interface";
import { clientRepository } from "../database/models/repositories/client.repository";

export class ClientService {
    async createClient(client: IClient): Promise<Client | Error> {
        if (await clientRepository.findOneBy({email: client.email})) {
            return new Error('Email already exists')
        }

        const newClient = clientRepository.create({
            ...client,
            // codClient: Math.floor(100000 + Math.random() * 900000)
        })

        await clientRepository.save(newClient)

        return newClient
    }
}