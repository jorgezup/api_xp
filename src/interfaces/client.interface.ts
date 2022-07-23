interface IClientResponse {
  codClient: number;
  accountId: number;
  name: string;
  surname: string;
  email: string;
}

interface IClientRequest extends IClientResponse {
  password: string;
}

interface IClientLogin {
  codClient: number;
  password: string;
}

export { IClientRequest, IClientResponse, IClientLogin };
