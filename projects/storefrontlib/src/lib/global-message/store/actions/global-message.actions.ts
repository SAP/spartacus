import { Action } from '@ngrx/store';

export const ADD_MESSAGE = '[Global Message] add a message';
export const REMOVE_MESSAGE = '[Global Message] remove a message';

export class AddMessage implements Action {
  readonly type = ADD_MESSAGE;
  constructor(
    public payload: { message_text: string; severity_level: string }
  ) {}
}

export class RemoveMessage implements Action {
  readonly type = REMOVE_MESSAGE;
  constructor(public payload: any) {}
}

export type globalMessageActions = AddMessage | RemoveMessage;
