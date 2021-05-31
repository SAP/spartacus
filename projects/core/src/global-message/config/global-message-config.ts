import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { GlobalMessageType } from '../models/global-message.model';

export type GlobalMessageTypeConfig = {
  timeout?: number;
};

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class GlobalMessageConfig {
  globalMessages?: {
    [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends GlobalMessageConfig {}
}
