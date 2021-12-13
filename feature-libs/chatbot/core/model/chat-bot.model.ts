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
}
