import { GlobalMessageType } from '../models/global-message.model';

export type GlobalMessageTypeConfig = {
  timeout?: number;
};

export abstract class GlobalMessageConfig {
  globalMessages: {
    [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig;
    [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig;
  };
}
