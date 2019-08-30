import { Action } from '@ngrx/store';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';

export const ADD_MESSAGE = '[Global-message] Add a Message';
export const REMOVE_MESSAGE = '[Global-message] Remove a Message';
export const REMOVE_MESSAGES_BY_TYPE =
  '[Global-message] Remove messages by type';

export class AddMessage implements Action {
  readonly type = ADD_MESSAGE;
  constructor(public payload: GlobalMessage) {}
}

export class RemoveMessage implements Action {
  readonly type = REMOVE_MESSAGE;
  constructor(public payload: { type: GlobalMessageType; index: number }) {}
}

export class RemoveMessagesByType implements Action {
  readonly type = REMOVE_MESSAGES_BY_TYPE;
  constructor(public payload: GlobalMessageType) {}
}

export type GlobalMessageAction =
  | AddMessage
  | RemoveMessage
  | RemoveMessagesByType;
