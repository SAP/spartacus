import { GlobalMessageType } from '@spartacus/core';

export type GlobalMessageConfig = {
  timeout?: number;
};

export abstract class GlobalMessageConfigs {
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageConfig;
  [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageConfig;
  [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageConfig;
}
