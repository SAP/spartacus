import * as fromGlobalMessage from './global-message.actions';

describe('Global Message Actions', () => {
  describe('CreateGlobalMessage Actions', () => {
    describe('AddMessage', () => {
      it('should create the action', () => {
        const message = { message_text: 'test', severity_level: 'warning' };
        const action = new fromGlobalMessage.AddMessage(message);
        expect({ ...action }).toEqual({
          type: fromGlobalMessage.ADD_MESSAGE,
          payload: message
        });
      });
    });
    describe('RemoveAction', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new fromGlobalMessage.RemoveMessage(error);
        expect({ ...action }).toEqual({
          type: fromGlobalMessage.REMOVE_MESSAGE,
          payload: error
        });
      });
    });
  });
});
