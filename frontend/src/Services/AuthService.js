export const authService = {
  logout,
  isLoggedIn,
  getCurrentUser,
  getJwt,
};

function logout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('userName');
  localStorage.removeItem('id');
  localStorage.removeItem('email');
  localStorage.clear();
}

function isLoggedIn() {
  let user = localStorage.getItem('user');
  if (user) {
    return true;
  } else {
    return false;
  }
}

function getCurrentUser() {
  let user = JSON.parse(localStorage.getItem('user'));
  return user;
}

function getJwt() {
  let jwt = localStorage.getItem('jwt');
  return jwt;
}
