export interface Repo {
  url: string
  name: string
  description: string
  language: string
}

export interface GithubClient {
  graphql<T>(query: string, variables: Record<string, any>): Promise<T>
}
