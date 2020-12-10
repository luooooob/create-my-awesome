import { info } from '@actions/core'
import type { GithubClient, Repo } from './types'

export const fetchRepos = async (
  github: GithubClient,
  collection: Repo[],
  username: string,
  after = ``
) => {
  const query = `
    query($login: String!, $after: String!) {
      user(login: $login) {
        starredRepositories(first: 100, after: $after) {
          nodes {
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
          totalCount
        }
      }
    }
  `
  const variables = {
    "login": username,
    "after": after
  }
  const data = await github.graphql(query, variables)
  const starred = data.user.starredRepositories
  starred.nodes.map(node => {
    const repo = {
      name: node.nameWithOwner,
      description: node.description || ``,
      language: node.primaryLanguage ? node.primaryLanguage.name : `Misc`
    }
    collection.push(repo)
  })

  info(`fetch repos count: ${collection.length}/${starred.totalCount}`)

  if (starred.pageInfo?.hasNextPage) {
    await fetchRepos(github, collection, username, starred.pageInfo.endCursor)
  }
}
