import { create } from '@/services/resume';
import { message } from 'antd';

const Model = {
  namespace: 'resume',
  state: {
  },
  effects: {
    *create({ payload }, { call }) {
      try {
        const response = yield call(create, payload);
        if(response.message) {
          message.error(response.message)
        } else {
          message.success('ζδΊ€ζε')
        }
        return response
      } catch (error) {
        return
      }
    }
  },
  reducers: {
  },
};
export default Model;
