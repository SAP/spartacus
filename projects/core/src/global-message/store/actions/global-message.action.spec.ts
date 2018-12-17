import * as fromGlobalMessage from './global-message.actions';
import {
  GlobalMessage,
  GlobalMessageType
} from '../../models/global-message.model';

describe('Global Message Actions', () => {
  describe('CreateGlobalMessage Actions', () => {
    describe('AddMessage', () => {
      it('should create the action', () => {
        const message: GlobalMessage = {
          text: 'test',
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION
        };

        const action = new fromGlobalMessage.AddMessage(message);

        expect({ ...action }).toEqual({
          type: fromGlobalMessage.ADD_MESSAGE,
          payload: message
        });
      });
    });

    describe('RemoveAction', () => {
      it('should create the action', () => {
        const payload = {
          type: GlobalMessageType.MSG_TYPE_ERROR,
          index: 0
        };

        const action = new fromGlobalMessage.RemoveMessage(payload);

        expect({ ...action }).toEqual({
          type: fromGlobalMessage.REMOVE_MESSAGE,
          payload: payload
        });
      });
    });

    describe('RemoveMessagesByType', () => {
      it('should create the action', () => {
        const payload = GlobalMessageType.MSG_TYPE_CONFIRMATION;

        const action = new fromGlobalMessage.RemoveMessagesByType(payload);

        expect({ ...action }).toEqual({
          type: fromGlobalMessage.REMOVE_MESSAGES_BY_TYPE,
          payload: payload
        });
      });
    });
  });
});
