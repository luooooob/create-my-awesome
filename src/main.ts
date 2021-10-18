import { error, getInput } from '@actions/core'
import { getOctokit } from '@actions/github'
import { info } from 'console'
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import mkdirp from 'mkdirp'
import { join } from 'path'
import { fetchRepos } from './fetchRepos'
import { renderToMd } from './renderToMd'
import type { Repo } from './types'

dotenv.config()

const main = async () => {

  const username = getInput(`username`)
  const repository = getInput(`repository`)
  const description = getInput(`description`)
  const workflow = getInput(`workflow`)
  const token = getInput(`token`)
  const targetDir = getInput(`targetDir`)

  const github = getOctokit(token)
  const collection = Array<Repo>()
  await fetchRepos(github, collection, username)

  await mkdirp(targetDir)

  const md = renderToMd(repository, description, workflow, collection)
  const mdFilename = join(targetDir, 'README.md')
  info(`write file: "${mdFilename}"`)
  info(md)
  await fs.writeFile(mdFilename, md)

}

main()
