# Create My Awesome

![GitHub release](https://img.shields.io/github/v/release/luob/create-my-awesome)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/luob/create-my-awesome/build-test)
![GitHub top language](https://img.shields.io/github/languages/top/luob/create-my-awesome)

Github Actions, 用于自动生成一个Awesome项目来整理所有你star过的仓库

## Usage

1. [新建一个Github仓库](https://github.com/new)
2. 在这个仓库中, [新建一个GitHub Actions 工作流程](https://docs.github.com/cn/free-pro-team@latest/actions/quickstart) 然后把下面的内容复制到 `.yml` 文件里

```yaml

name: 'build'
on:
  push:
    branches:
      - main
  schedule:
      # UTC时间每天00:00执行
      # 如果想在北京时间00:00执行，应该是 '0 16 * * *'
      # 更多例子见 https://crontab.guru/examples.html
      - cron:  '0 0 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: luob/create-my-awesome@v1
      # 提交更改
      # 见 https://github.com/EndBug/add-and-commit
      - uses: EndBug/add-and-commit@v5
        with:
          message: 'Update README.md'
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

使用仓库提供的`token`(`${{ github.token }}`)向Github提交更改并不会触发新工作流程, 不用担心这个工作流程会造成死循环.

## 更多用法

```yaml
  # ...
  - uses: luob/create-my-awesome@v1
    with:
      # 你可以使用任何Github用户的数据, 默认是仓库所有人
      username: zhang-san
      # 自定义项目描述, 默认是'A collection of awesome things.'
      description: 'A cOllectiOn OF awesOme thiNgs.',
      # 自定义目标文件夹, 默认是项目根目录
      targetDir: ./target/
  # ...
```

## 贡献

```sh
  npm i
  npm run all
```

如果要本地运行, 可以修改`.env.example`文件中的变量然后另存为`.env`. 然后运行:

```sh
  npm run local
```

## 版权

[MIT](LICENSE) 