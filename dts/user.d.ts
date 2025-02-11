declare namespace User {
  interface Auth {
    accessToken: string
    refreshToken: string
  }
  interface UserStore {
    auth: Auth
    userInfo: any
  }
}
