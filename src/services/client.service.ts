import bcrypt from "bcrypt-nodejs";

import { accountRepository } from "../database/models/repositories/account.repository";
import { clientRepository } from "../database/models/repositories/client.repository";
import {
  IClientLogin,
  IClientRequest,
  IClientResponse,
} from "../interfaces/client.interface";
import { IPayload } from "../interfaces/payload.interface";
import HttpException from "../shared/http.exception";
import { generateJWTToken } from "../utils/JWTToken";

export class ClientService {
  async createClient(client: IClientRequest): Promise<IClientResponse | Error> {
    if (await clientRepository.findOneBy({ email: client.email })) {
      return new Error("Email already exists");
    }

    const salt = bcrypt.genSaltSync(5);
    const clientToBeInserted: IClientRequest = {
      ...client,
      password: bcrypt.hashSync(client.password, salt),
    };

    const newClient = clientRepository.create(clientToBeInserted);

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
      return new Error();
    }

    const isClient = bcrypt.compareSync(
      password,
      accountClient.client.password
    );

    if (!isClient) {
      return new Error();
    }

    const payload: IPayload = {
      accountId: accountClient.id,
      codClient: accountClient.client.codClient,
      name: accountClient.client.name,
      surname: accountClient.client.surname,
      email: accountClient.client.email,
      isAdmin: accountClient.client.isAdmin,
    };

    const token = generateJWTToken(payload);

    return token;
  }
}
