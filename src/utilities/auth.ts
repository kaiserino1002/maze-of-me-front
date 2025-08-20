import api from './axios';

export async function getUser() {
  await api.get('/sanctum/csrf-cookie');
  const res = await api.get('/api/user');
  return res.data;
}
