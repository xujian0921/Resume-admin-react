import { stringify } from 'querystring';
import { history } from 'umi';
import { Login } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    token: undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
      const loginData = {
        account: payload.account,
        password: payload.password
      }
      try {
        const response = yield call(Login, loginData)
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); 
  
        if(response.token) {
          if(payload.rememberMe) {
            localStorage.setItem('USERNAME', payload.account)
            localStorage.setItem('PASSWORD', payload.password)
            localStorage.setItem('REMEMBERME', payload.rememberMe)
          } else {
            localStorage.removeItem('USERNAME')
            localStorage.removeItem('PASSWORD')
            localStorage.removeItem('REMEMBERME')
          }
          localStorage.setItem('AUTH_TOKEN', response.token)
          message.success('🎉 🎉 🎉  登录成功！');
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (window.routerBase !== '/') {
                redirect = redirect.replace(window.routerBase, '/');
              }
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }
          history.replace(redirect || '/');
        }
      } catch (error) {
        return
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        localStorage.removeItem('AUTH_TOKEN')
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, token: payload.token };
    },
  },
};
export default Model;
