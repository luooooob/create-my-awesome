import { fetchRepos } from '../src/fetchRepos'
import type { GithubClient, GqlResponse, Repo } from '../src/types'

const sleep = (ms = 0) => new Promise(r => setTimeout(r, ms))

test('test fetchRepos', async () => {
  const mockGithub: GithubClient = {
    graphql: async (query, variables): Promise<GqlResponse> => {
      expect(variables.login).toBe(`zhangSan`)
      expect(query.length).toBeGreaterThan(100)

      await sleep(30)

      const first: GqlResponse = {
        user: {
          starredRepositories: {
            nodes: [{
              url: "https://github.com/koajs/koa",
              nameWithOwner: "koajs/koa",
              description: "Expressive middleware for node.js using ES2017 async functions",
              primaryLanguage: {
                name: "JavaScript"
              }
            }, {
              url: "https://github.com/fouber/blog",
              nameWithOwner: "fouber/blog",
              description: "没事写写文章，喜欢的话请点star，想订阅点watch，千万别fork！",
              primaryLanguage: null
            }],
            pageInfo: {
              hasNextPage: true,
              endCursor: "Y3Vyc29yOnYyOpHOBMnTkA=="
            },
            totalCount: 3
          }
        }
      }
      const second: GqlResponse = {
        user: {
          starredRepositories: {
            nodes: [{
              url: "https://github.com/xufei/blog",
              nameWithOwner: "xufei/blog",
              description: "my personal blog",
              primaryLanguage: null
            }],
            pageInfo: {
              hasNextPage: false,
              endCursor: "Y3Vyc29yOnYyOpHOBTNlQw=="
            },
            totalCount: 3
          }
        }
      }
      if (variables.after === ``) {
        return first
      }
      if (variables.after === `Y3Vyc29yOnYyOpHOBMnTkA==`) {
        return second
      }
      return {} as GqlResponse
    }
  }
  const collection = Array<Repo>()
  await fetchRepos(mockGithub, collection, `zhangSan`, ``)

  expect(collection.length).toBe(3)
  expect(collection).toEqual([{
    url: 'https://github.com/koajs/koa',
    name: 'koajs/koa',
    description: 'Expressive middleware for node.js using ES2017 async functions',
    language: 'JavaScript'
  }, {
    url: 'https://github.com/fouber/blog',
    name: 'fouber/blog',
    description: '没事写写文章，喜欢的话请点star，想订阅点watch，千万别fork！',
    language: 'Misc'
  }, {
    url: 'https://github.com/xufei/blog',
    name: 'xufei/blog',
    description: 'my personal blog',
    language: 'Misc'
  }])
})
