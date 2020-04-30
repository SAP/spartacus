import { Translatable } from '../../i18n/translatable';

export enum GlobalMessageType {
  MSG_TYPE_CONFIRMATION = '[GlobalMessage] Confirmation',
  MSG_TYPE_ERROR = '[GlobalMessage] Error',
  MSG_TYPE_INFO = '[GlobalMessage] Information',
  MSG_TYPE_WARNING = '[GlobalMessage] Warning',
}

export interface GlobalMessage {
  text: Translatable;
  type: GlobalMessageType;
  timeout?: number;
}
