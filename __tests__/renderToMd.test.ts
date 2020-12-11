import { getInput } from '@actions/core'
import { promises as fs } from 'fs'
import mkdirp from 'mkdirp'
import { join } from 'path'
import { renderToMd } from '../src/renderToMd'

test('test renderToMd format', async () => {
  const md = renderToMd(
    'zhangSan/awesome-Zhang-san',
    'awesome zhang-san project',
    'build',
    [{
      name: "erikhuda/thor",
      description: "Thor is a toolkit for building powerful command-line interfaces.",
      language: "Ruby"
    }, {
      name: "fouber/blog",
      description: "没事写写文章，喜欢的话请点star，想订阅点watch，千万别fork！",
      language: "Misc"
    }, {
      name: "opal/opal",
      description: "Ruby ♥︎ JavaScript",
      language: "Ruby"
    }]
  )

  const targetDir = getInput(`targetDir`)
  await mkdirp(targetDir)
  await fs.writeFile(join(targetDir, 'test-1.md'), md)

  expect(md).toMatch(/^# Awesome Zhang San/m)
  expect(md).toMatch(/\S\n\nawesome zhang-san project\n\n\S/m)
  expect(md).toMatch(/\S\n\n---\n\n\S/m)
  expect(md).toMatch(/\S\n\n## Misc\n\n/m)
})

test('test renderToMd anchors', async () => {
  const md = renderToMd(
    'zhangSan/C',
    'awesome zhang-san project',
    'build',
    [{
      name: "Tencent/TencentOS-tiny",
      description: "腾讯物联网终端操作系统",
      language: "C"
    }, {
      name: "halo-dev/halo",
      description: "✍  An excellent open source blog publishing application. | 一个优秀的开源博客发布应用。",
      language: "Java"
    }, {
      name: "halo-dev/halo",
      description: "✍  An excellent open source blog publishing application. | 一个优秀的开源博客发布应用。",
      language: "Java++"
    }, {
      name: "Tencent/Fanvas",
      description: "Fanvas，一键把swf转为html5 canvas动画。 Fanvas is a tool which can turn flash into canvas animation with just one key!",
      language: "ActionScript"
    }, {
      name: "Qv2ray/Qv2ray",
      description: ":star: Linux / Windows / macOS 跨平台 V2Ray 客户端 | 支持 VMess / VLESS / SSR / Trojan / Trojan-Go / NaiveProxy / HTTP / HTTPS / SOCKS5 | 使用 C++ / Qt 开发 | 可拓展插件式设计 :star:",
      language: "C++"
    }, {
      name: "atlas-engineer/nyxt",
      description: "Nyxt - the internet on your terms.",
      language: "Common Lisp"
    }, {
      name: "dotnet/maui",
      description: ".NET MAUI is the .NET Multi-platform App UI, a framework for building native device applications spanning mobile, tablet, and desktop.",
      language: "C#"
    }, {
      name: "staxrip/staxrip",
      description: "🎞 Video encoding GUI for Windows.",
      language: "Visual Basic .NET"
    }]
  )

  const targetDir = getInput(`targetDir`)
  await mkdirp(targetDir)
  await fs.writeFile(join(targetDir, 'test-2.md'), md)

  expect(md).toMatch(/^- \[C\]\(#c-1\)$/m)
  expect(md).toMatch(/^- \[C#\]\(#c-2\)$/m)
  expect(md).toMatch(/^- \[Java\]\(#java\)$/m)
  expect(md).toMatch(/^- \[Java\+\+\]\(#java-1\)$/m)

  expect(md).toMatch(/^- \[ActionScript\]\(#actionscript\)$/m)
  expect(md).toMatch(/^- \[Common Lisp\]\(#common-lisp\)$/m)
  expect(md).toMatch(/^- \[Visual Basic .NET\]\(#visual-basic-net\)$/m)
})

test('test renderToMd escape', async () => {
  const md = renderToMd(
    'zhangSan/awesome-Zhang-san',
    'awesome <zhang-san> project',
    'build',
    [{
      name: "select/selectjs",
      description: "you can <select> me",
      language: "Ruby"
    }, {
      name: "fouber/blog",
      description: "没事写写文章，喜欢的<话>请点star，想订阅点watch，千万别fork！",
      language: "Misc"
    }]
  )

  const targetDir = getInput(`targetDir`)
  await mkdirp(targetDir)
  await fs.writeFile(join(targetDir, 'test-3.md'), md)

  expect(md).toMatch(/&lt;select&gt;/m)
  expect(md).toMatch(/&lt;话&gt;/m)
})