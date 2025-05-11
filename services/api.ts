import Constants from 'expo-constants';

const { API_BASE_URL } = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
