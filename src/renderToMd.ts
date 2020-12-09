import { capitalCase } from "capital-case"
import type { Repo } from "./types"

type Category = { name: string, anchor: string, times: number, id: string, items: Repo[] }

export const renderToMd = (
  repository: string,
  description: string,
  workflow: string,
  repos: Repo[]
) => {
  const title = capitalCase(repository.split(`/`)[1])
  const badge = {
    text: `build`,
    svg: `https://github.com/${repository}/workflows/${workflow}/badge.svg`,
    href: `https://github.com/${repository}/actions`
  }

  const flag: Category = { name: ``, anchor: ``, times: -1, id: ``, items: [] }
  const categories: Category[] = Array
    .from(new Set(
      repos.map(repo => repo.language))
    )
    .sort((a, b) => {
      if (a == "Misc") {
        return 1
      }
      if (b == "Misc") {
        return -1
      }
      return a > b ? 1 : -1
    })
    .reduce((acc, language) => {
      const anchor = language
        .toLocaleLowerCase()
        .replace(/[^0-9|^a-z|\s]/g, ``)
        .replace(` `, `-`)
      const lastAnchor = acc
        .filter(acc => acc.anchor == anchor)
        .reduce((pre, cur) => pre.times > cur.times ? pre : cur, flag)
      const times = lastAnchor.times + 1
      const id = `#${anchor}` + (times > 0 ? `-${times}` : ``)
      const items = repos
        .filter(repo => repo.language === language)
        .sort((a, b) => a.name > b.name ? 1 : -1)
      acc.push({
        name: language,
        anchor,
        times,
        id,
        items
      })
      return acc
    }, Array<Category>())

  const rawHeading = `# ${title}  [![${badge.text}](${badge.svg})](${badge.href})\n\n`

  const rawIntroduction = `${description}\n\n`

  const rawCategories = categories
    .map(category => `- [${category.name}](${category.id})\n`)
    .join(``)

  const rawLine = `\n---\n\n`

  const rawContent = categories.map(category => {
    const rawH2 = `## ${category.name}\n\n`

    const rawItems = category.items
      .map(repo => `- [${repo.name}](https://github.com/${repo.name}) - ${repo.description}\n`)
      .join(``)

    return `${rawH2}${rawItems}\n`
  }).join(``)

  return rawHeading + rawIntroduction + rawCategories + rawLine + rawContent
}