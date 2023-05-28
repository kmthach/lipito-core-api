export interface IResponse<T> {
  statusCode: number;
  data: T;
  errors: string[];
  message: string;
}
