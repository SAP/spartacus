import { INIT } from '@ngrx/store';
import { StateConfig, StateTransferType } from '../config/state-config';
import {
  CX_KEY,
  getBrowserTransferStateReducer,
  getServerTransferStateReducer,
  getTransferStateReducer,
} from './transfer-state.reducer';

describe('TransferStateReducer', () => {
  describe('getTransferStateReducer', () => {
    it('should return transparent reducer without proper configuration', () => {
      const reducer = getTransferStateReducer('browser', null, null);
      const subReducer = () => {};
      expect(reducer(subReducer)).toBe(subReducer);
    });

    it('should return reducer for proper configuration', () => {
      const reducer = getTransferStateReducer(
        'browser',
        {} as any,
        {
          state: {
            ssrTransfer: {
              keys: {},
            },
          },
        } as StateConfig
      );

      expect(reducer).toEqual(jasmine.any(Function));
    });
  });

  describe('getServerTransferStateReducer', () => {
    let transferStateMock;
    let subReducer;
    let metaReducer;
    let reducer;

    beforeEach(() => {
      transferStateMock = {
        set: jasmine.createSpy(),
      } as any;
      subReducer = (state, action) => (action.payload ? action.payload : state);
      metaReducer = getServerTransferStateReducer(transferStateMock, {
        test: StateTransferType.TRANSFER_STATE,
      });
      reducer = metaReducer(subReducer);
    });

    it('should set transfer state for an action', () => {
      reducer({}, {});
      expect(transferStateMock.set).toHaveBeenCalled();
    });

    it('should take into account keys configuration', () => {
      const samplePayload = { test: 'test' };
      reducer({}, { payload: samplePayload });
      expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, samplePayload);
    });

    it('should take into account keys configuration and not include unrelated state', () => {
      const samplePayload = { test2: 'test' };
      reducer({}, { payload: samplePayload });
      expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, {});
    });

    it('should call the sub reducer and returns proper state', () => {
      const samplePayload = { test: 'test' };
      const state = reducer({}, { payload: samplePayload });
      expect(state).toEqual(samplePayload);
    });
  });

  describe('getBrowserTransferStateReducer', () => {
    let transferStateMock;
    let subReducer;
    let metaReducer;
    let reducer;
    let serverState;

    beforeEach(() => {
      serverState = { test: 'state' };
      transferStateMock = {
        get: jasmine.createSpy().and.returnValue(serverState),
        hasKey: jasmine.createSpy().and.returnValue(true),
      } as any;
      subReducer = (state, action) => (action.payload ? action.payload : state);
      metaReducer = getBrowserTransferStateReducer(
        transferStateMock,
        {
          test: StateTransferType.TRANSFER_STATE,
        },
        false
      );
      reducer = metaReducer(subReducer);
    });

    it('should get transfer state for initial action', () => {
      reducer({}, { type: INIT });
      expect(transferStateMock.get).toHaveBeenCalledWith(CX_KEY, {});
    });

    it('should not get transfer state for not initial action', () => {
      reducer({}, { type: 'some action' });
      reducer({}, {});
      expect(transferStateMock.get).not.toHaveBeenCalled();
    });

    it('should merge transfer state with the state', () => {
      const state = reducer({}, { type: INIT });
      expect(state).toEqual(serverState);
    });

    it('should call the sub reducer and returns proper state', () => {
      const samplePayload = { test: 'test' };
      const state = reducer({}, { payload: samplePayload });
      expect(state).toEqual(samplePayload);
    });
  });
});
