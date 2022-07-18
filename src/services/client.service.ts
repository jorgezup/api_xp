import { Client } from "../database/models/entities/Client";
import { IClient } from "../interfaces/client.interface";
import { clientRepository } from "../database/models/repositories/client.repository";
import { accountRepository } from "../database/models/repositories/account.repository";

export class ClientService {
    async createClient(client: IClient): Promise<Client | Error> {
        if (await clientRepository.findOneBy({email: client.email})) {
            return new Error('Email already exists')
        }

        const newClient = clientRepository.create({
            ...client,
            // codClient: Math.floor(100000 + Math.random() * 900000)
        })

        const newAccount = accountRepository.create({client: newClient})

        await clientRepository.save(newClient)
        await accountRepository.save(newAccount)

        return newClient
    }
}