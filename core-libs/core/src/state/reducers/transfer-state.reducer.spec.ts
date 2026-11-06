import { inject } from '@angular/core';
import { INIT } from '@ngrx/store';
import { of } from 'rxjs';
import { StateConfig, StateTransferType } from '../config/state-config';
import {
  CX_KEY,
  getBrowserTransferStateReducer,
  getServerTransferStateOnSerializer,
  getServerTransferStateReducer,
  getTransferStateReducer,
} from './transfer-state.reducer';

vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@angular/core')>();
  return { ...actual, inject: vi.fn() };
});

function mockFeatureFlag(value: boolean) {
  vi.mocked(inject).mockReturnValue({ ssrTransferStateLazyWrite: value } as any);
}

describe('TransferStateReducer', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getTransferStateReducer', () => {
    it('should return transparent reducer without proper configuration', () => {
      const reducer = getTransferStateReducer('browser', undefined, undefined);
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
    let transferStateMock: any;
    let subReducer: any;

    beforeEach(() => {
      transferStateMock = { set: vi.fn() };
      subReducer = (state: any, action: any) =>
        action.payload ? action.payload : state;
    });

    describe('when ssrTransferStateLazyWrite is enabled', () => {
      beforeEach(() => mockFeatureFlag(true));

      it('should return a no-op meta-reducer', () => {
        const metaReducer = getServerTransferStateReducer(transferStateMock, {
          test: StateTransferType.TRANSFER_STATE,
        });
        expect(metaReducer(subReducer)).toBe(subReducer);
        expect(transferStateMock.set).not.toHaveBeenCalled();
      });
    });

    describe('when ssrTransferStateLazyWrite is disabled', () => {
      beforeEach(() => mockFeatureFlag(false));

      it('should set transfer state on every action', () => {
        const reducer = getServerTransferStateReducer(transferStateMock, {
          test: StateTransferType.TRANSFER_STATE,
        })(subReducer);
        reducer({}, {});
        expect(transferStateMock.set).toHaveBeenCalled();
      });

      it('should extract only configured keys', () => {
        const reducer = getServerTransferStateReducer(transferStateMock, {
          test: StateTransferType.TRANSFER_STATE,
        })(subReducer);
        reducer({}, { payload: { test: 'test' } });
        expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, {
          test: 'test',
        });
      });

      it('should not include unrelated state keys', () => {
        const reducer = getServerTransferStateReducer(transferStateMock, {
          test: StateTransferType.TRANSFER_STATE,
        })(subReducer);
        reducer({}, { payload: { test2: 'test' } });
        expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, {});
      });

      it('should return state from the sub-reducer', () => {
        const reducer = getServerTransferStateReducer(transferStateMock, {
          test: StateTransferType.TRANSFER_STATE,
        })(subReducer);
        const state = reducer({}, { payload: { test: 'test' } });
        expect(state).toEqual({ test: 'test' });
      });
    });
  });

  describe('getServerTransferStateOnSerializer', () => {
    let transferStateMock: any;
    let storeMock: any;
    let config: StateConfig;

    beforeEach(() => {
      transferStateMock = { set: vi.fn() };
      storeMock = of({ test: 'value', other: 'ignored' });
      config = {
        state: {
          ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } },
        },
      } as StateConfig;
    });

    describe('when ssrTransferStateLazyWrite is enabled', () => {
      beforeEach(() => mockFeatureFlag(true));

      it('should write the correct state slice to TransferState once', async () => {
        const fn = getServerTransferStateOnSerializer(
          'server',
          storeMock,
          transferStateMock,
          config
        );
        await fn();
        expect(transferStateMock.set).toHaveBeenCalledTimes(1);
        expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, {
          test: 'value',
        });
      });

      it('should not write when not on the server', async () => {
        const fn = getServerTransferStateOnSerializer(
          'browser',
          storeMock,
          transferStateMock,
          config
        );
        await fn();
        expect(transferStateMock.set).not.toHaveBeenCalled();
      });

      it('should not write when TransferState is not provided', async () => {
        const fn = getServerTransferStateOnSerializer(
          'server',
          storeMock,
          undefined,
          config
        );
        await fn();
        expect(transferStateMock.set).not.toHaveBeenCalled();
      });

      it('should not write when ssrTransfer keys are not configured', async () => {
        const fn = getServerTransferStateOnSerializer(
          'server',
          storeMock,
          transferStateMock,
          {} as StateConfig
        );
        await fn();
        expect(transferStateMock.set).not.toHaveBeenCalled();
      });
    });

    describe('when ssrTransferStateLazyWrite is disabled', () => {
      beforeEach(() => mockFeatureFlag(false));

      it('should not write even on the server', async () => {
        const fn = getServerTransferStateOnSerializer(
          'server',
          storeMock,
          transferStateMock,
          config
        );
        await fn();
        expect(transferStateMock.set).not.toHaveBeenCalled();
      });
    });
  });

  describe('getBrowserTransferStateReducer', () => {
    let transferStateMock: any;
    let subReducer;
    let metaReducer;
    let reducer: any;
    let serverState: any;

    beforeEach(() => {
      serverState = { test: 'state' };
      transferStateMock = {
        get: vi.fn().mockReturnValue(serverState),
        hasKey: vi.fn().mockReturnValue(true),
      } as any;
      subReducer = (state: any, action: any) => (action.payload ? action.payload : state);
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
