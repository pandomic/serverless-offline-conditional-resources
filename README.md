![](https://travis-ci.org/pandomic/serverless-offline-conditional-resources.svg?branch=master)

# serverless-offline-conditional-resources

## About

`serverless-offline-conditional-resources` is a lightweight plugin to conditionally remove
`functions`, `resources` and `stackTags` from deployments based on current `stage`. This
can be very helpful when working with unsupported by Localstack resource types.

## Installation

Use `yarn` or `npm` to add the plugin to your package dependecies:

```
npm install --save-dev serverless-offline-conditional-resources
```

or

```
yarn add serverless-offline-conditional-resources --dev
```

## Usage

1. Add plugin to you serverless plugins

```yaml
plugins:
  ...
  - serverless-offline-conditional-resources
```

2. Configure plugin

By default resources are not excluded upon deployment. To start excluding them,
you need to provide `stages` or `Stages` attribute to whitelist allowed stages.

```yaml
provider:
  stackTags:
    stages:
      - dev
      - prod
      - staging
    MY_TAG: tag-one
  vpc:
    stages:
      - dev
      - prod
      - staging
    ...
functions:
  ...
  my-function:
    stages:
      - dev
      - production
layers:
  ...
  my-layer:
    stages:
      - dev
      - production
resources:
  Outputs:
    MyCoolOutput:
      Stages:
        - dev
      Ref: some-ref
  Resources:
    MyLovelyResource:
      Stages:
        - prod
      Type: Aws::AwesomeResource
      ...
```

## Contributions

You are welcome to create pull requests to improve the project. Please check out
the [contribution](https://github.com/pandomic/serverless-offline-conditional-resources/blob/master/CONTRIBUTING.md)
quick guide to get started.

## License

The project is distributed under [MIT](https://github.com/pandomic/serverless-offline-conditional-resources/blob/master/LICENSE) license.
