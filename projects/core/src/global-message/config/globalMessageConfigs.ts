export type GlobalMessageConfig = {
  hideOnRouteChange?: boolean;
  timeout?: number;
};

export abstract class GlobalMessageConfigs {
  confirmation?: GlobalMessageConfig;
  information?: GlobalMessageConfig;
  error?: GlobalMessageConfig;
}
