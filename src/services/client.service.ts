import { accountRepository } from "../database/models/repositories/account.repository";
import { clientRepository } from "../database/models/repositories/client.repository";
import {
  IClientLogin,
  IClientRequest,
  IClientResponse,
} from "../interfaces/client.interface";
import { IPayload } from "../interfaces/payload.interface";
import { generateJWTToken } from "../utils/JWTToken";

export class ClientService {
  async createClient(client: IClientRequest): Promise<IClientResponse | Error> {
    if (await clientRepository.findOneBy({ email: client.email })) {
      return new Error("Email already exists");
    }

    const newClient = clientRepository.create(client);

    const newAccount = accountRepository.create({ client: newClient });

    await clientRepository.save(newClient);
    await accountRepository.save(newAccount);

    const response: IClientResponse = {
      codClient: newClient.codClient,
      accountId: newAccount.id,
      name: newClient.name,
      surname: newClient.surname,
      email: newClient.email,
    };

    return response;
  }
  async loginClient({
    codClient,
    password,
  }: IClientLogin): Promise<string | Error> {
    const accountClient = await accountRepository.findOneBy({
      client: { codClient },
    });
    if (!accountClient) {
      return new Error("Client does not exists");
    }
    const payload: IPayload = {
      accountId: accountClient.id,
      codClient: accountClient.client.codClient,
      name: accountClient.client.name,
      surname: accountClient.client.surname,
      email: accountClient.client.email,
    };

    const token = generateJWTToken(payload);

    return token;
  }
}
