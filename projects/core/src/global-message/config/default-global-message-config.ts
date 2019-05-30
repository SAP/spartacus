import { GlobalMessageType } from '../models/global-message.model';
import { GlobalMessageConfig } from './global-message-config';

export const defaultGlobalMessageConfig: GlobalMessageConfig = {
  globalMessages: {
    [GlobalMessageType.MSG_TYPE_CONFIRMATION]: {
      timeout: 3000,
    },
    [GlobalMessageType.MSG_TYPE_INFO]: {
      timeout: 10000,
    },
  },
};
