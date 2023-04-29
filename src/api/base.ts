import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const baseApiRoot: string = process.env.NEXT_PUBLIC_API_ROOT ?? "";
const _buildPath = (path: string): string => `${baseApiRoot}/${path}`;
const _getAccessToken = Cookies.get("accessToken");

type Request = {
  path: string;
  query?: string;
};

interface PostRequest<T> extends Request {
  data: T;
}

export class PublicApi {
  static get<T>(data: Request) {
    return axios.get<T>(_buildPath(data.path));
  }
  static post<DT, RT>(data: PostRequest<DT>) {
    return axios.post<DT, AxiosResponse<RT>>(_buildPath(data.path), data.data);
  }
}

const baseConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${_getAccessToken}`,
  },
};

export class PrivateAPI {
  static get<T>(data: Request) {
    return axios.get<T>(_buildPath(data.path), baseConfig);
  }

  static post<DT, RT>(data: PostRequest<DT>) {
    return axios.post<DT, AxiosResponse<RT>>(
      _buildPath(data.path),
      data.data,
      baseConfig
    );
  }
}
