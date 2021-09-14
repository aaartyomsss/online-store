import config from '../config';
const BASE_URL = `${config.CONSTANTS.BASE_URL}/api/token-auth/`;

export const authorize = async (username, password) => {
  const data = {
    username,
    password,
  };
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(BASE_URL, params);
  if (!response.ok) {
    return false;
  }
  return await response.json();
};
