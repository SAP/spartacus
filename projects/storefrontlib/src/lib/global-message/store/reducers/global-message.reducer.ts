import { GlobalMessageAction } from '../actions/global-message.actions';
import { GlobalMessageType, GlobalMessage } from '../../models/message.model';
import * as fromAction from '../actions';

export interface GlobalMessageState {
  entities: Map<GlobalMessageType, string[]>;
}

export const initialState: GlobalMessageState = {
  entities: new Map<GlobalMessageType, string[]>()
};

export function reducer(
  state = initialState,
  action: GlobalMessageAction
): GlobalMessageState {
  switch (action.type) {
    case fromAction.ADD_MESSAGE: {
      const message: GlobalMessage = action.payload;

      if (state.entities[message.type] === undefined) {
        const entities = {
          ...state.entities,
          [message.type]: [message.text]
        };

        return {
          ...state,
          entities
        };
      } else {
        const msgs = state.entities[message.type];

        if (msgs.indexOf(message.text) === -1) {
          const entities = {
            ...state.entities,
            [message.type]: [...msgs, message.text]
          };

          return {
            ...state,
            entities
          };
        }
      }

      return state;
    }

    case fromAction.REMOVE_MESSAGE: {
      const msgType = action.payload.type;
      const msgIndex = action.payload.index;
      const messages = [...state.entities.get(msgType)];
      messages.splice(msgIndex, 1);

      const entities = {
        ...state.entities,
        [msgType]: messages
      };
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getMessages = (state: GlobalMessageState) => state.entities;
