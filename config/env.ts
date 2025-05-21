const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
if (!apiUrl) {
  throw new Error('API URL is not defined');
}

export default {apiUrl}