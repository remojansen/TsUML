<img src="/assets/logo.png" width="150" align="right" />

# TsUML

:construction: WORK IN PROGRESS :construction:

Generate UML diagram for your TypeScript applications powered by https://yuml.me/

![](/assets/cli-preview.gif)

## Installation

```sh
npm install -g tsuml
```

## Usage

```
tsuml --glob 'src/**/*.ts'
```

The diagram generated for the code under the [demo folder](https://github.com/remojansen/TsUML/tree/master/src/demo) looks as follows:

## Troubleshooting

Certain shells (such as `zsh`) will parse the `--glob` argument before passing it to `tsuml`. To ensure a file glob is passed unchanged to `tsuml` make sure the glob pattern is surrounded in quotes.

![](/assets/uml_diagram.svg)
