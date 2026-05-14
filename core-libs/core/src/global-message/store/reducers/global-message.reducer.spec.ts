import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageActions } from '../actions/index';
import { GlobalMessageState } from '../global-message-state';
import * as fromGlobalMessage from './global-message.reducer';

describe('Cart reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromGlobalMessage;
      const action = {} as GlobalMessageActions.GlobalMessageAction;
      const state = fromGlobalMessage.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_MESSAGE action', () => {
    it('Should add message to the list of messages', () => {
      const { initialState } = fromGlobalMessage;

      const mockMessage: GlobalMessage = {
        text: { raw: 'Test message' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      };

      const action = new GlobalMessageActions.AddMessage(mockMessage);

      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.entities[mockMessage.type]).toEqual([mockMessage.text]);
    });
  });

  describe('REMOVE_MESSAGE action', () => {
    it('Should remove the message from the state by index', () => {
      const initialState: GlobalMessageState = {
        entities: {
          [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'Test message' }],
        },
      };

      const action = new GlobalMessageActions.RemoveMessage({
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
        index: 0,
      });

      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.entities[GlobalMessageType.MSG_TYPE_CONFIRMATION]).toEqual(
        []
      );
    });
  });

  describe('REMOVE_MESSAGES_BY_TYPE action', () => {
    it('Should remove messages by type from the state', () => {
      const initialState: GlobalMessageState = {
        entities: {
          [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [
            { raw: 'test' },
            { raw: 'test2' },
          ],
          [GlobalMessageType.MSG_TYPE_ERROR]: [{ raw: 'test' }],
        },
      };

      const action = new GlobalMessageActions.RemoveMessagesByType(
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
