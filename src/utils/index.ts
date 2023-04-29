import { AxiosError } from "axios";

const NODE_ENV = process.env.NODE_ENV;

export const logError = (e: unknown) => {
  const error = e as AxiosError<
    any,
    { error: string; messsage: string; statusCode: number }
  >;

  NODE_ENV === "development" && console.log(error.response?.data?.message);
};
