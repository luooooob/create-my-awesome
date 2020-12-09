# Create My Awesome

![GitHub release](https://img.shields.io/github/v/release/luob/create-my-awesome)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/luob/create-my-awesome/build-test)
![GitHub top language](https://img.shields.io/github/languages/top/luob/create-my-awesome)

Github Actions for automatically generating the personal awesome list from all of the repositories you starred.

## Usage

1. [Create a new repository on Github](https://github.com/new)
2. From this repository, [create a new GitHub Actions workflow](https://docs.github.com/en/free-pro-team@latest/actions/quickstart) and copy the following YAML contents info the `.yml` file

```yaml

name: 'build'
on:
  push:
    branches:
      - main
  schedule:
      # This expression means every day at UTC 00:00
      # See https://crontab.guru/examples.html for more examples
      - cron:  '0 0 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: luob/create-my-awesome@v1.0.0-alpha.2
      # Commit the change
      # See https://github.com/EndBug/add-and-commit
      - uses: EndBug/add-and-commit@v5
        with:
          message: 'Update README.md'
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

- Pushing changes with `${{ github.token }}` will not create a new workflow run, this prevents you from accidentally creating recursive workflow runs. So don't warry about  trigger it on changes.


## Advance Usage

You can customize the description:

```yaml
  # ...
  - uses: luob/create-my-awesome@v1.0.0-alpha.2
    with:
      description: 'A liSt oF awesOme thiNgs.',
      targetDir: ./target/
  # ...
```

## Contributing

```sh
  npm i
  npm run all
```

To run it locally, you can customize the variables in `.env.example` and save as `.env`. Then:

```sh
  npm run local
```

## License

[MIT](LICENSE) 