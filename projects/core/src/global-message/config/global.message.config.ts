type MESSAGE_TYPE = 'confirmation' | 'information' | 'error';

export abstract class DefaultGlobalMessageConfig {
  // @ts-ignore
  [key: MESSAGE_TYPE]: {
    hideOnRouteChange?: boolean;
    timeout?: number;
  };
}
