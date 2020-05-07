import { GlobalMessageType } from '../models/global-message.model';
import { GlobalMessageConfig } from './global-message-config';

export function defaultGlobalMessageConfigFactory(): GlobalMessageConfig {
  return {
    globalMessages: {
      [GlobalMessageType.MSG_TYPE_CONFIRMATION]: {
        timeout: 3000,
      },
      [GlobalMessageType.MSG_TYPE_INFO]: {
        timeout: 3000,
      },
      [GlobalMessageType.MSG_TYPE_ERROR]: {
        timeout: 7000,
      },
      [GlobalMessageType.MSG_TYPE_WARNING]: {
        timeout: 7000,
      },
    },
  };
}
