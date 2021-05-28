import request from '@/utils/request';

export async function saveImage(params) {
  return request('/api/saveImage', {
    method: 'POST',
    data: params
  });
}

export async function getImageUrl() {
  return request('/api/getImageUrl');
}