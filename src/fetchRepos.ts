import { info } from '@actions/core'
import type { GithubClient, Repo } from './types'

export interface GqlResponseUser {
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
    }
  }
}

export const fetchRepos = async (
  github: GithubClient,
  collection: Repo[],
  username: string,
  after = ``
) => {
  const data = await getUser(github, username, after)
  const repos = getRepo(data)
  const pageInfo = data.user.starredRepositories.pageInfo
  repos.map(repo => {
    info(`get repo info: ${repo.name}`)
    collection.push(repo)
  })

  if (pageInfo?.hasNextPage) {
    await fetchRepos(github, collection, username, pageInfo.endCursor)
  }
}

export const getUser = async (github: GithubClient, username: string, after: string) => {
  const query = `
    query($login: String!, $after: String!) {
      user(login: $login) {
        starredRepositories(first: 100, after: $after) {
          nodes {
            url
            nameWithOwner
            description
            primaryLanguage {
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `
  const variables = {
    "login": username,
    "after": after
  }
  return await github.graphql<GqlResponseUser>(query, variables)
}

export const getRepo = (data: GqlResponseUser): Repo[] => {
  return data.user.starredRepositories.nodes.map(node => ({
    url: node.url,
    name: node.nameWithOwner,
    description: node.description || ``,
    language: node.primaryLanguage ? node.primaryLanguage.name : `Misc`
  }))
}
