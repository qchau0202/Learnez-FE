/** Auth state and login/logout */
export function useAuth() {
  return { user: null, isAuthenticated: false, login: async () => {}, logout: async () => {} }
}
