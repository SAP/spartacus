import { Translatable } from '../../i18n/translatable';

export enum GlobalMessageType {
  MSG_TYPE_CONFIRMATION = '[GlobalMessage] Confirmation',
  MSG_TYPE_ERROR = '[GlobalMessage] Error',
  MSG_TYPE_INFO = '[GlobalMessage] Information',
}

export interface GlobalMessage {
  text: Translatable;
  type: GlobalMessageType;
}

export interface GlobalMessageInput {
  text: string | GlobalMessageTranslatableText;
  type: GlobalMessageType;
}

export interface GlobalMessageTranslatableText {
  key: string;
  params?: { [param: string]: any };
}
