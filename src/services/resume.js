import request from '@/utils/request';

export async function create(data) {
  return request('/api/resume/create', {
    method: 'POST',
    data: data
  });
}

export async function find() {
  return request('/api/resume/find');
}

export async function findById(data) {
  return request('/api/resume/findById', {
    method: 'GET',
    params: data
  })
}

export async function findByAccount(data) {
  return request('/api/resume/findByAccount', {
    params: data
  })
}

export async function updated(id, data) {
  return request(`/api/resume/${id}`, {
    method: 'PATCH',
    data: data
  })
}