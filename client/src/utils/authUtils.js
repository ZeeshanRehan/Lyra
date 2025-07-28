// src/utils/authUtils.js

export function signupUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) return false;

  users[username] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

export function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const user = users[username];

  if (!user || user.password !== password) return false;

  localStorage.setItem("currentUser", JSON.stringify({ username }));
  return true;
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}
