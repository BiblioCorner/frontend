import Constants from 'expo-constants';

const { API_BASE_URL } = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



//code pour injecter le token à revoir erreur
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants from 'expo-constants';

// const { API_BASE_URL } = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Intercepteur TypeScript-compatible
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
