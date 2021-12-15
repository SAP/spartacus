import { Translatable } from '@spartacus/core';

export const enum AuthorType {
  CUSTOMER = 'CUSTOMER',
  BOT = 'BOT',
}

export interface ChatBotOption {
  text: Translatable;
  callback: Function;
}

export interface ChatBotMessage {
  author: AuthorType;
  text?: Translatable;
  status: MessageStatus;
}

export const enum ChatBotEvent {
  INIT = 'INIT',
  DISPLAY_RECOMMENDATIONS = 'DISPLAY_RECOMMENDATIONS',
  NEW_MESSAGE = 'NEW_MESSAGE',
  UPDATE_MESSAGE_STATUS = 'UPDATE_MESSAGE_STATUS',
}

export const enum MessageStatus {
  SENT = 'SENT',
  WRITING = 'WRITING',
  QUEUED = 'QUEUED',
}
