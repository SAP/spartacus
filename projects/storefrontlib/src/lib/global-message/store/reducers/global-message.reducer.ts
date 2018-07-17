import { GlobalMessageAction } from '../actions/global-message.actions';
import { GlobalMessageType, GlobalMessage } from '../../models/message.model';
import * as fromAction from '../actions';

export interface GlobalMessageState {
  entities: { [type: string]: string[] };
}

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

      let entities: any;
      if (state.entities[message.type] === undefined) {
        entities = {
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
          entities = {
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
      const type = action.payload.type;
      const index = action.payload.index;

      const messages = [...state.entities[type]];
      messages.splice(index, 1);

      const entities = {
        ...state.entities,
        [type]: messages
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
