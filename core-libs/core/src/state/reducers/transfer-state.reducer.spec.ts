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

      expect(reducer).toEqual(expect.any(Function));
    });
  });

  describe('getServerTransferStateReducer', () => {
    describe('legacy mode (deferred = false)', () => {
      let transferStateMock: { set: ReturnType<typeof vi.fn> };
      let reducer: ReturnType<ReturnType<typeof getServerTransferStateReducer>>;

      beforeEach(() => {
        transferStateMock = { set: vi.fn() };
        const subReducer = (state: any, action: any) =>
          action.payload ? action.payload : state;
        const metaReducer = getServerTransferStateReducer(
          transferStateMock as any,
          { test: StateTransferType.TRANSFER_STATE },
          false
        );
        reducer = metaReducer(subReducer);
      });

      it('should set transfer state synchronously on each action', () => {
        reducer({}, {});
        expect(transferStateMock.set).toHaveBeenCalled();
      });

      it('should write once per action', () => {
        const firstPayload = { test: 'first' };
        const lastPayload = { test: 'last' };
        reducer({}, { payload: firstPayload });
        reducer({}, { payload: lastPayload });
        expect(transferStateMock.set).toHaveBeenCalledTimes(2);
      });

      it('should call the sub reducer and returns proper state', () => {
        const samplePayload = { test: 'test' };
        const state = reducer({}, { payload: samplePayload });
        expect(state).toEqual(samplePayload);
      });
    });

    describe('deferred mode (deferred = true)', () => {
      let transferStateMock: { set: ReturnType<typeof vi.fn> };
      let reducer: ReturnType<ReturnType<typeof getServerTransferStateReducer>>;

      beforeEach(() => {
        transferStateMock = { set: vi.fn() };
        const subReducer = (state: any, action: any) =>
          action.payload ? action.payload : state;
        const metaReducer = getServerTransferStateReducer(
          transferStateMock as any,
          { test: StateTransferType.TRANSFER_STATE },
          true
        );
        reducer = metaReducer(subReducer);
      });

      it('should set transfer state after the microtask flushes', async () => {
        reducer({}, {});
        expect(transferStateMock.set).not.toHaveBeenCalled();
        await Promise.resolve();
        expect(transferStateMock.set).toHaveBeenCalled();
      });

      it('should take into account keys configuration', async () => {
        const samplePayload = { test: 'test' };
        reducer({}, { payload: samplePayload });
        await Promise.resolve();
        expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, samplePayload);
      });

      it('should take into account keys configuration and not include unrelated state', async () => {
        const samplePayload = { test2: 'test' };
        reducer({}, { payload: samplePayload });
        await Promise.resolve();
        expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, {});
      });

      it('should batch multiple synchronous actions into a single write', async () => {
        const firstPayload = { test: 'first' };
        const lastPayload = { test: 'last' };
        reducer({}, { payload: firstPayload });
        reducer({}, { payload: lastPayload });
        await Promise.resolve();
        expect(transferStateMock.set).toHaveBeenCalledTimes(1);
        expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, lastPayload);
      });

      it('should call the sub reducer and returns proper state synchronously', () => {
        const samplePayload = { test: 'test' };
        const state = reducer({}, { payload: samplePayload });
        expect(state).toEqual(samplePayload);
      });
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
        get: vi.fn().mockReturnValue(serverState),
        hasKey: vi.fn().mockReturnValue(true),
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
