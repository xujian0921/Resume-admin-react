/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message, notification } from 'antd';

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = async (error) => {
   // 请求已发送但服务端返回状态码非 2xx 的响应
  const { response } = error;

  try {
    const data = await response.clone().json()
    if (data) {
      message.error(`${data.error.message}`);
    } else {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
  
    return Promise.reject(data)
  } catch (error) {
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    } else if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    return Promise.reject(response)
  }
};
/** 配置request请求时的默认参数 */

const request = extend({
  errorHandler
})

request.interceptors.request.use(async (url, options) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  if( token ){
      const headers = {
          Authorization: `Bearer ${token}`,
      }
      return ({
          url: url,
          options: { ...options, headers: headers },
      })
  }
  return ({
      url: url,
      options: options,
  })
})

export default request;
