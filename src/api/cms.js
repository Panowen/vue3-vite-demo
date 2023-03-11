import createAxiosByinterceptors from '../utils/axios-req';

const client = createAxiosByinterceptors('CMS');
export default {
  img(data, config) {
    return client.post({ url: '/config/image', data, config });
  },
};
