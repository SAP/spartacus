import { GlobalMessageConfigs } from './globalMessageConfigs';
import { GlobalMessageType } from '@spartacus/core';

export const defaultGlobalMessageConfig: GlobalMessageConfigs = {
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]: {
    timeout: 3000,
  },
  [GlobalMessageType.MSG_TYPE_INFO]: {
    timeout: 10000,
  },
};
