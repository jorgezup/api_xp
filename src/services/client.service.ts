import { Client } from "../database/models/entities/Client";
import { accountRepository } from "../database/models/repositories/account.repository";
import { clientRepository } from "../database/models/repositories/client.repository";
import { IClient } from "../interfaces/client.interface";
import { generateJWTToken } from "../utils/JWTToken";

type loginClientRequest = {
  codClient: number;
  password: number;
};

type Payload = {
  id: string;
};

export class ClientService {
  async createClient(client: IClient): Promise<Client | Error> {
    if (await clientRepository.findOneBy({ email: client.email })) {
      return new Error("Email already exists");
    }

    const newClient = clientRepository.create({
      ...client,
      // codClient: Math.floor(100000 + Math.random() * 900000)
    });

    const newAccount = accountRepository.create({ client: newClient });

    await clientRepository.save(newClient);
    await accountRepository.save(newAccount);

    return newClient;
  }
  async loginClient({
    codClient,
    password,
  }: loginClientRequest): Promise<string | Error> {
    if (!(await clientRepository.findOneBy({ codClient }))) {
      return new Error("Client does not exists");
    }

    const payload: Payload = { id: codClient.toString() };

    const token = generateJWTToken(payload);
    // console.log(token);
    return token;
  }
}
