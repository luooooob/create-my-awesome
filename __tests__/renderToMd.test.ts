import { getInput } from '@actions/core'
import mkdirp from 'mkdirp'
import { join } from 'path'
import { renderToMd } from '../src/renderToMd'
import { promises as fs } from 'fs'

test('test render', async () => {
  const md = renderToMd(
    'zhangSan/awesome-Zhang-san',
    'awesome zhang-san project',
    'build',
    [{
      url: "https://github.com/erikhuda/thor",
      name: "erikhuda/thor",
      description: "Thor is a toolkit for building powerful command-line interfaces.",
      language: "Ruby"
    }, {
      url: "https://github.com/fouber/blog",
      name: "fouber/blog",
      description: "没事写写文章，喜欢的话请点star，想订阅点watch，千万别fork！",
      language: "Misc"
    }, {
      url: "https://github.com/opal/opal",
      name: "opal/opal",
      description: "Ruby ♥︎ JavaScript",
      language: "Ruby"
    }, {
      url: "https://github.com/Tencent/TencentOS-tiny",
      name: "Tencent/TencentOS-tiny",
      description: "腾讯物联网终端操作系统",
      language: "C"
    }, {
      url: "https://github.com/halo-dev/halo",
      name: "halo-dev/halo",
      description: "✍  An excellent open source blog publishing application. | 一个优秀的开源博客发布应用。",
      language: "Java"
    }, {
      url: "https://github.com/halo-dev/halo",
      name: "halo-dev/halo",
      description: "✍  An excellent open source blog publishing application. | 一个优秀的开源博客发布应用。",
      language: "Java++"
    }, {
      url: "https://github.com/Qv2ray/Qv2ray",
      name: "Qv2ray/Qv2ray",
      description: ":star: Linux / Windows / macOS 跨平台 V2Ray 客户端 | 支持 VMess / VLESS / SSR / Trojan / Trojan-Go / NaiveProxy / HTTP / HTTPS / SOCKS5 | 使用 C++ / Qt 开发 | 可拓展插件式设计 :star:",
      language: "C++"
    }, {
      url: "https://github.com/atlas-engineer/nyxt",
      name: "atlas-engineer/nyxt",
      description: "Nyxt - the internet on your terms.",
      language: "Common Lisp"
    }, {
      url: "https://github.com/dotnet/maui",
      name: "dotnet/maui",
      description: ".NET MAUI is the .NET Multi-platform App UI, a framework for building native device applications spanning mobile, tablet, and desktop.",
      language: "C#"
    }]
  )

  const targetDir = getInput(`targetDir`)
  mkdirp(targetDir)
  await fs.writeFile(join(targetDir, 'README.test.md'), md)

  expect(md).toMatch(/^# Awesome Zhang San/m)
  expect(md).toMatch(/\S\n\nawesome zhang-san project\n\n\S/m)
  expect(md).toMatch(/\S\n\n---\n\n\S/m)
  expect(md).toMatch(/\S\n\n## Misc\n\n/m)
  expect(md).toMatch(/^- \[C\]\(#c\)$/m)
  expect(md).toMatch(/^- \[C#\]\(#c-1\)$/m)
  expect(md).toMatch(/^- \[C\+\+\]\(#c-2\)$/m)
  expect(md).toMatch(/^- \[Java\]\(#java\)$/m)
  expect(md).toMatch(/^- \[Java\+\+\]\(#java-1\)$/m)
  expect(md).toMatch(/^- \[Common Lisp\]\(#common-lisp\)$/m)
  expect(md).toMatch(/^- \[Misc\]\(#misc\)$/m)
})
