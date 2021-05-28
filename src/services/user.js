import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}


export async function getUserList(data) {
  return request('/api/users/getUser', {
    method: 'GET',
    params: data
  })
}

export async function register(data) {
  return request('/api/users/register', {
    method: 'POST',
    data
  })
}

export async function updated(data,id) {
  return request(`/api/users/updated/${id}`, {
    method: 'PUT',
    data
  })
}

export async function del(id) {
  return request(`/api/users/delete/${id}`, {
    method: 'DELETE'
  })
}

export async function getPersonUser() {
  return request('/api/users/getPersonUser')
}