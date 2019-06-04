import { GlobalMessageConfig } from './global-message-config';
import { GlobalMessageType } from '../models/global-message.model';

export function defaultGlobalMessageConfigFactory(): GlobalMessageConfig {
  return {
    globalMessages: {
      [GlobalMessageType.MSG_TYPE_CONFIRMATION]: {
        timeout: 3000,
      },
      [GlobalMessageType.MSG_TYPE_INFO]: {
        timeout: 10000,
      },
    },
  };
}
