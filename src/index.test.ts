import { Serverless as ServerlessType } from './types';
import Plugin from './index';

const createServerless = (): ServerlessType => ({
  service: {
    functions: {
      'my-first-function': {
        // @ts-ignore
        stages: ['dev', 'staging', 'prod'],
        handler: 'index.handler'
      },
      // @ts-ignore
      'my-second-function': {
        handler: 'index.handler'
      },
      'my-third-function': {
        // @ts-ignore
        stages: ['local'],
        handler: 'index.handler'
      }
    },
    provider: {
      vpc: {
        stages: ['dev', 'staging', 'prod'],
        subnetIds: ['1', '2', '3'],
        securityGroupIds: ['1', '2', '3'],
      },
      stackTags: {
        // @ts-ignore
        stages: ['dev', 'staging', 'prod'],
        TAG_ONE: 'value',
        TAG_TWO: 'value'
      }
    },
    resources: {
      Outputs: {
        FirstOutput: {
          // @ts-ignore
          Stages: ['dev', 'staging', 'prod'],
          Ref: 'some-ref'
        },
        SecondOutput: {
          // @ts-ignore
          Ref: 'some-ref'
        },
        ThirdOutput: {
          // @ts-ignore
          Stages: ['local'],
          Ref: 'some-ref'
        }
      },
      Resources: {
        FirstResource: {
          // @ts-ignore
          Stages: ['dev', 'staging', 'prod'],
          Type: 'AWS::SomeCoolResource'
        },
        // @ts-ignore
        SecondResource: {
          Type: 'AWS::SomeCoolResource'
        },
        ThirdResource: {
          // @ts-ignore
          Stages: ['local'],
          Type: 'AWS::SomeCoolResource'
        }
      }
    }
  },
});

test('removes resources which do not match active stage', async () => {
  const serverless = createServerless();
  const plugin = new Plugin(serverless, { stage: 'local', region: '' });

  plugin.hooks["before:offline:start:init"]();

  expect(serverless.service.resources).toEqual({
    Outputs: {
      SecondOutput: {
        Ref: 'some-ref'
      },
      ThirdOutput: {
        Ref: 'some-ref'
      }
    },
    Resources: {
      SecondResource: {
        Type: 'AWS::SomeCoolResource'
      },
      ThirdResource: {
        Type: 'AWS::SomeCoolResource'
      }
    }
  });

  expect(serverless.service.functions).toEqual({
    'my-second-function': {
      handler: 'index.handler'
    },
    'my-third-function': {
      handler: 'index.handler'
    }
  });

  expect(serverless.service.provider.stackTags).toEqual(undefined);
  expect(serverless.service.provider.vpc).toEqual(undefined);
});
