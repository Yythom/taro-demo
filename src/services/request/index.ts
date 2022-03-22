import Taro from '@tarojs/taro';
import getBaseUrl from './baseURL';

class HttpRequest {
  baseOptions(params, method = 'POST') {
    const { url, data, contentType = 'application/json' } = params;
    const BASE_URL = getBaseUrl();
    const option: any = {
      url: BASE_URL + url,
      data,
      method,
      header: {
        'Content-Type': contentType,
        // token: getStorageSync('token'),
      },
    };
    const task = Taro.request(option);
    return task
  }
  async get<T>(url, data = '') {
    const ret: Taro.request.SuccessCallbackResult<T> = await this.baseOptions({ url, data }, 'GET');
    const _data: T = ret.data;
    return _data
  }

  async post<T>(url, data = {}, contentType?) {
    const ret: Taro.request.SuccessCallbackResult<T> = await this.baseOptions({ url, data, contentType })
    const _data: T = ret.data;
    return _data
  }
}

const http = new HttpRequest();

export default http;
