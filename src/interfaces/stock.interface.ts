export type StockRequest = {
  name: string;
};

export type ErrorAPI = {
  error: string;
  message: string;
};

export type StockResponse = {
  error?: ErrorAPI;
  message: string;
  symbol: string;
  price: number;
  updated_at: Date;
};
