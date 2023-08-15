export type RendererSessionData = {
  username: string
  role: string
} | null

export type MainSessionData = {
  username: string
  role: string
  token: string
}

export type LoginData = {
  username: string
  password: string
  setLoading: (loading: boolean) => void
}
