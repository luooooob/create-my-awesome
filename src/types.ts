export interface Repo {
  name: string
  description: string
  language: string
}

export interface GqlResponse {
  user: {
    starredRepositories: {
      nodes: {
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
