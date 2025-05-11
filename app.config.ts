import 'dotenv/config';

export default {
  expo: {
    name: 'TonApp',
    slug: 'ton-app',
    version: '1.0.0',
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
};
