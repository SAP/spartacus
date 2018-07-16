import { GlobalMessageState } from './global-message.reducer';
import { globalMessageActions } from './../actions/global-message.actions';
import * as fromAction from '../actions';

export interface GlobalMessageState {
  messages: Array<{ severity_level: string; message_text: string }>;
}

export const initialState: GlobalMessageState = {
  messages: []
};

export function reducer(
  state = initialState,
  action: globalMessageActions
): GlobalMessageState {
  switch (action.type) {
    case fromAction.ADD_MESSAGE: {
      const currentMessages = state.messages;
      const newMessages = [
        ...currentMessages,
        {
          message_text: action.payload.message_text,
          severity_level: action.payload.severity_level
        }
      ];

      return {
        ...state,
        ...{ messages: newMessages }
      };
    }

    case fromAction.REMOVE_MESSAGE: {
      const msgToBeRemoved = action.payload;
      const newMessagesState = state.messages.filter(
        msg =>
          msg.message_text !== msgToBeRemoved.message_text &&
          msg.severity_level !== msgToBeRemoved.severity_level
      );

      return {
        ...state,
        ...{ messages: newMessagesState }
      };
    }
  }
  return state;
}

export const getMessages = (state: GlobalMessageState) => state.messages;
