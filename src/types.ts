import * as ServerlessType from "serverless";
import { Resources } from "serverless/plugins/aws/provider/awsProvider";

export { default as Plugin } from "serverless/classes/Plugin";
export { CloudFormationResources } from "serverless/plugins/aws/provider/awsProvider";

export type Serverless = ServerlessType & {
  service: {
    functions: { [name: string]: ServerlessType.FunctionDefinition },
    provider: { stackTags?: { [key: string]: string }, vpc: unknown },
    resources: Resources
  },
}

export type FunctionDefinition = ServerlessType.FunctionDefinition;
export type Options = ServerlessType.Options;
