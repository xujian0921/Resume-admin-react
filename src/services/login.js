import request from '@/utils/request';

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function Login(params) {
  return request('/api/users/login', {
    method: 'POST',
    data: params,
  });
}
