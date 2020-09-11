import { cleanStages } from './stages';


test('removes stages from output', () => {
  const functionDefinition = {
    timeout: 30,
    handler: 'index.handler',
    stages: ['dev', 'staging', 'prod'],
    events: [
      {
        http: {
          path: '/api/v1/do-something',
          private: true
        }
      },
    ]
  };

  expect(cleanStages(functionDefinition)).toEqual({
    timeout: 30,
    handler: 'index.handler',
    events: [
      {
        http: {
          path: '/api/v1/do-something',
          private: true
        }
      },
    ]
  });
});

test('does not change output', () => {
  const functionDefinition = {
    timeout: 30,
    handler: 'index.handler',
    events: [
      {
        http: {
          path: '/api/v1/do-something',
          private: true
        }
      },
    ]
  };

  expect(cleanStages(functionDefinition)).toEqual({
    timeout: 30,
    handler: 'index.handler',
    events: [
      {
        http: {
          path: '/api/v1/do-something',
          private: true
        }
      },
    ]
  });
});
