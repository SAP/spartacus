import { Action } from '@ngrx/store';
import { GlobalMessage, RemoveMessageData } from '../../models/message.model';

export const ADD_MESSAGE = '[Global-message] Add a Message';
export const REMOVE_MESSAGE = '[Global-message] Remove a Message';

export class AddMessage implements Action {
  readonly type = ADD_MESSAGE;
  constructor(public payload: GlobalMessage) {}
}

export class RemoveMessage implements Action {
  readonly type = REMOVE_MESSAGE;
  constructor(public payload: RemoveMessageData) {}
}

export type GlobalMessageAction = AddMessage | RemoveMessage;
