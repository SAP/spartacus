import * as fromGlobalMessage from './global-message.reducer';
import * as fromActions from './../actions/index';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageState, GlobalMessageAction } from '..';

describe('Cart reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromGlobalMessage;
      const action = {} as GlobalMessageAction;
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

      const action = new fromActions.AddMessage(mockMessage);

      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.entities[mockMessage.type]).toEqual([mockMessage.text]);
    });

    it('Should not add duplicated message to the list of messages', () => {
      const { initialState } = fromGlobalMessage;

      const mockMessageConfirmation: GlobalMessage = {
        text: { raw: 'Test message confirmation' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      };
      const mockMessageConfirmation2: GlobalMessage = {
        text: { raw: 'Test message confirmation2' },
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      };

      const action1 = new fromActions.AddMessage(mockMessageConfirmation);
      const action2 = new fromActions.AddMessage(mockMessageConfirmation);
      const action3 = new fromActions.AddMessage(mockMessageConfirmation2);

      const state1 = fromGlobalMessage.reducer(initialState, action1);
      const state2 = fromGlobalMessage.reducer(state1, action2);
      const state3 = fromGlobalMessage.reducer(state2, action3);

      expect(state3.entities[GlobalMessageType.MSG_TYPE_CONFIRMATION]).toEqual([
        mockMessageConfirmation.text,
        mockMessageConfirmation2.text,
      ]);
    });
  });

  describe('REMOVE_MESSAGE action', () => {
    it('Should remove the message from the state by index', () => {
      const initialState: GlobalMessageState = {
        entities: {
          [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'Test message' }],
        },
      };

      const action = new fromActions.RemoveMessage({
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
