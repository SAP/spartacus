import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageActions } from './index';

describe('Global Message Actions', () => {
  describe('CreateGlobalMessage Actions', () => {
    describe('AddMessage', () => {
      it('Should create the action', () => {
        const message: GlobalMessage = {
          text: { raw: 'Test action' },
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
        };

        const action = new GlobalMessageActions.AddMessage(message);

        expect({ ...action }).toEqual({
          type: GlobalMessageActions.ADD_MESSAGE,
          payload: message,
        });
      });
    });

    describe('RemoveMessage', () => {
      it('Should create the action', () => {
        const payload = {
          type: GlobalMessageType.MSG_TYPE_ERROR,
          index: 0,
        };

        const action = new GlobalMessageActions.RemoveMessage(payload);

        expect({ ...action }).toEqual({
          type: GlobalMessageActions.REMOVE_MESSAGE,
          payload: payload,
        });
      });
    });

    describe('RemoveMessagesByType', () => {
      it('should create the action', () => {
        const payload = GlobalMessageType.MSG_TYPE_CONFIRMATION;

        const action = new GlobalMessageActions.RemoveMessagesByType(payload);

        expect({ ...action }).toEqual({
          type: GlobalMessageActions.REMOVE_MESSAGES_BY_TYPE,
          payload: payload,
        });
      });
    });
  });
});
