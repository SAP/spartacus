import { Translatable } from '../../../i18n/translatable';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageActions } from '../actions/index';
import { GlobalMessageState } from '../global-message-state';

export const initialState: GlobalMessageState = {
  entities: {},
};

export function reducer(
  state = initialState,
  action: GlobalMessageActions.GlobalMessageAction
): GlobalMessageState {
  switch (action.type) {
    case GlobalMessageActions.ADD_MESSAGE: {
      const message: GlobalMessage = action.payload;

      if (state.entities[message.type] === undefined) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [message.type]: [message.text],
          },
        };
      } else {
        const currentMessages: Translatable[] = state.entities[message.type];
        return {
          ...state,
          entities: {
            ...state.entities,
            [message.type]: [...currentMessages, message.text],
          },
        };
      }
    }

    case GlobalMessageActions.REMOVE_MESSAGE: {
      const msgType: GlobalMessageType = action.payload.type;
      const msgIndex: number = action.payload.index;
      if (
        Object.keys(state.entities).length === 0 ||
        !state.entities[msgType]
      ) {
        return state;
      }

      const messages = [...state.entities[msgType]];
      messages.splice(msgIndex, 1);

      return {
        ...state,
        entities: {
          ...state.entities,
          [msgType]: messages,
        },
      };
    }

    case GlobalMessageActions.REMOVE_MESSAGES_BY_TYPE: {
      const entities = {
        ...state.entities,
        [action.payload]: [],
      };
      return {
        ...state,
        entities,
      };
    }
  }

  return state;
}
