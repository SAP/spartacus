import { GlobalMessageAction } from '../actions/global-message.actions';
import { GlobalMessage } from '../../models/global-message.model';
import * as fromAction from '../actions';
import { GlobalMessageState } from '../state';

export const initialState: GlobalMessageState = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: GlobalMessageAction
): GlobalMessageState {
  switch (action.type) {
    case fromAction.ADD_MESSAGE: {
      const message: GlobalMessage = action.payload;

      if (state.entities[message.type] === undefined) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [message.type]: [message.text]
          }
        };
      } else {
        const msgs = state.entities[message.type];

        if (msgs.indexOf(message.text) === -1) {
          return {
            ...state,
            entities: {
              ...state.entities,
              [message.type]: [...msgs, message.text]
            }
          };
        }
      }

      return state;
    }

    case fromAction.REMOVE_MESSAGE: {
      const msgType = action.payload.type;
      const msgIndex = action.payload.index;
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
          [msgType]: messages
        }
      };
    }

    case fromAction.REMOVE_MESSAGES_BY_TYPE: {
      const entities = {
        ...state.entities,
        [action.payload]: []
      };
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getEntities = (state: GlobalMessageState) => state.entities;
