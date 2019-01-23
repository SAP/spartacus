import * as fromGlobalMessage from './global-message.reducer';
import * as fromActions from './../actions/index';
import {
  GlobalMessage,
  GlobalMessageType
} from '../../models/global-message.model';

describe('Cart reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromGlobalMessage;
      const action = {} as any;
      const state = fromGlobalMessage.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_MESSAGE action', () => {
    it('Should add message to the list of messages', () => {
      const { initialState } = fromGlobalMessage;

      const mockMessage: GlobalMessage = {
        text: 'Test message',
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION
      };

      const action = new fromActions.AddMessage(mockMessage);

      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.entities[mockMessage.type]).toEqual([mockMessage.text]);
    });
  });

  describe('REMOVE_MESSAGE action', () => {
    it('Should remove the message from the state by index', () => {
      const initialState = {
        entities: {
          [GlobalMessageType.MSG_TYPE_CONFIRMATION]: ['Test message']
        }
      };

      const action = new fromActions.RemoveMessage({
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
        index: 0
      });

      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.entities[GlobalMessageType.MSG_TYPE_CONFIRMATION]).toEqual(
        []
      );
    });
  });

  describe('REMOVE_MESSAGES_BY_TYPE action', () => {
    it('Should remove messages by type from the state', () => {
      const initialState = {
        entities: {
          [GlobalMessageType.MSG_TYPE_CONFIRMATION]: ['test', 'test2'],
          [GlobalMessageType.MSG_TYPE_ERROR]: ['test']
        }
      };

      const action = new fromActions.RemoveMessagesByType(
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );

      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.entities[GlobalMessageType.MSG_TYPE_CONFIRMATION]).toEqual(
        []
      );

      // does not modify other fields
      expect(state.entities[GlobalMessageType.MSG_TYPE_ERROR]).toEqual(
        initialState.entities[GlobalMessageType.MSG_TYPE_ERROR]
      );
    });
  });
});
