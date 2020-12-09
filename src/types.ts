export interface Repo {
  url: string
  name: string
  description: string
  language: string
}

export interface GqlResponse {
  user: {
    starredRepositories: {
      nodes: {
        url: string
        nameWithOwner: string
        description: string
        primaryLanguage: {
          name: string
        } | null
      }[],
      pageInfo: {
        hasNextPage: boolean,
        endCursor: string
      }
      totalCount: number
    }
  }
}

export interface GithubClient {
  graphql(query: string, variables: Record<string, any>): Promise<GqlResponse>
}
