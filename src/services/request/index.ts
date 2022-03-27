import Taro from '@tarojs/taro';
import getBaseUrl from './baseURL';
import interceptors from './interceptors';

interceptors.forEach((item) => Taro.addInterceptor(item));
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
    return ret
  }

  async post<T>(url, data = {}, contentType?) {
    const ret: Taro.request.SuccessCallbackResult<T> = await this.baseOptions({ url, data, contentType })
    return ret
  }
}

const http = new HttpRequest();

export default http;
