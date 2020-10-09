import { Plugin, Serverless, Options, CloudFormationResources, FunctionDefinition } from "./types";
import { cleanStages } from "./stages";

class ServerlessOfflineConditionalResources implements Plugin {
  hooks = {
    'before:package:initialize': this.onHook.bind(this),
    'before:offline:start:init': this.onHook.bind(this),
  };

  private options: Options;
  private serverless: Serverless;

  constructor(serverless: Serverless, options: Options) {
    this.options = options;
    this.serverless = serverless;
  }


  private onHook() {
    if (this.serverless.service.resources) {
      this.serverless.service.resources.Outputs =
      this.replaceResources(this.serverless.service.resources.Outputs);

      this.serverless.service.resources.Resources =
        this.replaceResources(this.serverless.service.resources.Resources) as CloudFormationResources;
    }

    this.serverless.service.functions =
      this.replaceResources(this.serverless.service.functions) as { [name: string]: FunctionDefinition };

    this.serverless.service.provider.stackTags =
      (this.replaceResources({ tags: this.serverless.service.provider.stackTags }) as { tags: { [key: string]: string } | undefined })?.tags;

    this.serverless.service.provider.vpc =
      (this.replaceResources({ vpc: this.serverless.service.provider.vpc }) as { vpc?: unknown })?.vpc;
  }

  private replaceResources(resources?: { [name: string]: unknown }) {
    if (!resources) return resources;

    return Object.entries(resources).reduce((memo, [name, definition]: [string, Record<string, unknown>]) => {
      const stages = (definition && (definition.stages || definition.Stages)) as string[] | undefined;

      if (!stages) return { ...memo, [name]: definition } ;

      return this.allowedStage(stages) ?
        { ...memo, [name]: cleanStages(definition) } :
        memo;
    }, {});
  }

  private allowedStage (stages?: string[]): boolean {
    if (!stages) return true;

    return stages.includes(
      this.options.stage || this.serverless.service.provider?.stage
    );
  }
}

export = ServerlessOfflineConditionalResources;
