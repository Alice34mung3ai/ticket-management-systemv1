const API_URL = import.meta.env.VITE_API_URL;



export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}
export function getToken() {
  return localStorage.getItem("token");
}
export async function fetchUser() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${API_URL}/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  } else {
    logout();
    return null;
  }
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
  const res = await fetch(`${API_URL}${url}`, { ...options, headers });
  if (res.status === 401) {
    logout();
    window.location.href = "/login";
    return;
  }
  return res;
}