export default function authHeader() {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': accessToken };
    } else {
      return {};
    }
  }