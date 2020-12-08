import { error, getInput, info } from '@actions/core'
import { getOctokit } from '@actions/github'
import { promises as fs } from 'fs'
import { dirname } from 'path'
import { fetchRepos } from './fetchRepos'
import { renderToMd } from './renderToMd'
import type { Repo } from './types'
import dotenv from 'dotenv'
import mkdirp from 'mkdirp'

dotenv.config()

const main = async () => {
  try {
    const username = getInput(`username`)
    const repository = getInput(`repository`)
    const introduction = getInput(`introduction`)
    const target = getInput(`target`)
    const workflow = getInput(`workflow`)
    const token = getInput(`token`)

    info(`username: ${username}`)
    info(`repository: ${repository}`)
    info(`introduction: ${introduction}`)
    info(`target: ${target}`)

    const github = getOctokit(token)
    const collection = Array<Repo>()
    await fetchRepos(github, collection, username)
    const text = renderToMd(repository, introduction, workflow, collection)

    info(text)

    await mkdirp(dirname(target))
    await fs.writeFile(target, text)
  } catch (err) {
    error(err)
  }
}

main()
