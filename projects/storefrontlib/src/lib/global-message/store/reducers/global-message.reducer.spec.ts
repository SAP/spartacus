import * as fromGlobalMessage from './global-message.reducer';
import * as fromActions from './../actions';

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
    it('should add message to the list of messages', () => {
      const mockMessage: any = {
        message_text: 'test',
        severity_level: 'debug'
      };
      const { initialState } = fromGlobalMessage;

      const action = new fromActions.AddMessage(mockMessage);
      const state = fromGlobalMessage.reducer(initialState, action);
      console.log(state.messages);
      expect(state.messages).toEqual([mockMessage]);
    });
  });

  describe('REMOVE_MESSAGE action', () => {
    it('should remove the message from the state with an index', () => {
      const initialState = {
        messages: [{ message_text: 'test', severity_level: 'test' }]
      };

      const action = new fromActions.RemoveMessage({ index: 0 });
      const state = fromGlobalMessage.reducer(initialState, action);

      expect(state.messages).toEqual([]);
    });
  });
});
