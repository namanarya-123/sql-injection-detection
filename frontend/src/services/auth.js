export function saveAuth(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('userName', data.name);
  localStorage.setItem('userRole', data.role);
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUserRole() {
  return localStorage.getItem('userRole');
}

export function getUserName() {
  return localStorage.getItem('userName');
}
