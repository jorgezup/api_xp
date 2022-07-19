class HttpException extends Error {
  statusCode: number;

  messageType: string;

  constructor(statusCode: number, messageType: string) {
    super(messageType);
    this.statusCode = statusCode;
    this.messageType = messageType;
  }
}

export default HttpException;
