import { GlobalMessageType } from '../models/global-message.model';
import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

export type GlobalMessageTypeConfig = {
  timeout?: number;
};

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class GlobalMessageConfig {
  globalMessages: {
    [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig;
  };
}
