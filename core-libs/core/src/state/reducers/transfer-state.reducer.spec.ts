import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { INIT } from '@ngrx/store';
import { of } from 'rxjs';
import { StateConfig, StateTransferType } from '../config/state-config';
import {
  CX_KEY,
  getBrowserTransferStateReducer,
  getBeforeAppSerializedTransferStateProvider,
  getLegacyServerTransferStateReducer,
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

    it('should be a no-op meta-reducer on server when ssrTransferStateBeforeAppSerialized is true', () => {
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = {
        state: { ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } } },
      } as StateConfig;
      const featureToggles = { ssrTransferStateBeforeAppSerialized: true } as any;

      const metaReducer = getTransferStateReducer(
        'server',
        transferStateMock,
        config,
        undefined,
        featureToggles
      );
      const subReducer = (state: any) => state ?? { test: 'value' };
      const reducer = metaReducer(subReducer);

      const result = reducer({ test: 'value' }, { type: 'ANY_ACTION' });
      expect(result).toEqual({ test: 'value' });
      expect(transferStateMock.set).not.toHaveBeenCalled();
    });

    it('should use legacy server reducer on server when ssrTransferStateBeforeAppSerialized is false', () => {
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = {
        state: { ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } } },
      } as StateConfig;
      const featureToggles = { ssrTransferStateBeforeAppSerialized: false } as any;

      const metaReducer = getTransferStateReducer(
        'server',
        transferStateMock,
        config,
        undefined,
        featureToggles
      );
      const subReducer = (_state: any, action: any) =>
        action.payload ? action.payload : _state;
      const reducer = metaReducer(subReducer);

      reducer({}, { payload: { test: 'first' } });
      reducer({ test: 'first' }, { payload: { test: 'second' } });

      expect(transferStateMock.set).toHaveBeenCalledTimes(2);
    });

    it('should use legacy server reducer on server when feature toggle is absent', () => {
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = {
        state: { ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } } },
      } as StateConfig;

      const metaReducer = getTransferStateReducer(
        'server',
        transferStateMock,
        config,
        undefined,
        undefined
      );
      const subReducer = (_state: any, action: any) =>
        action.payload ? action.payload : _state;
      const reducer = metaReducer(subReducer);

      reducer({}, { payload: { test: 'value' } });

      expect(transferStateMock.set).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLegacyServerTransferStateReducer', () => {
    let transferStateMock: any;
    let subReducer: any;
    let metaReducer: any;
    let reducer: any;

    beforeEach(() => {
      transferStateMock = {
        set: vi.fn(),
      } as any;
      subReducer = (state: any, action: any) => (action.payload ? action.payload : state);
      metaReducer = getLegacyServerTransferStateReducer(transferStateMock, {
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

    it('should not call transferState.set when newState is falsy', () => {
      const falsySubReducer = (_state: any, _action: any) => null;
      const falsyMetaReducer = getLegacyServerTransferStateReducer(
        transferStateMock,
        { test: StateTransferType.TRANSFER_STATE }
      );
      const falsyReducer = falsyMetaReducer(falsySubReducer);

      falsyReducer({ test: 'existing' }, { type: 'ANY' });
      expect(transferStateMock.set).not.toHaveBeenCalled();
    });
  });

  describe('getBrowserTransferStateReducer', () => {
    let transferStateMock: any;
    let subReducer: any;
    let metaReducer: any;
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

  describe('getBeforeAppSerializedTransferStateProvider', () => {
    it('should return a provider with provide: BEFORE_APP_SERIALIZED and multi: true', () => {
      const provider = getBeforeAppSerializedTransferStateProvider() as any;
      expect(provider.provide).toBe(BEFORE_APP_SERIALIZED);
      expect(provider.multi).toBe(true);
    });

    it('should call transferState.set with the filtered state slice when feature toggle is true on server', async () => {
      const serverState = { test: 'serverValue', other: 'ignore' };
      const storeMock = of(serverState) as any;
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = {
        state: {
          ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } },
        },
      } as StateConfig;
      const platformId = 'server';
      const featureToggles = { ssrTransferStateBeforeAppSerialized: true } as any;

      const provider = getBeforeAppSerializedTransferStateProvider() as any;
      const callback = provider.useFactory(
        storeMock,
        transferStateMock,
        config,
        platformId,
        featureToggles
      );

      await callback();

      expect(transferStateMock.set).toHaveBeenCalledWith(CX_KEY, { test: 'serverValue' });
    });

    it('should not call transferState.set when feature toggle is false', async () => {
      const storeMock = of({ test: 'value' }) as any;
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = {
        state: {
          ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } },
        },
      } as StateConfig;
      const featureToggles = { ssrTransferStateBeforeAppSerialized: false } as any;

      const provider = getBeforeAppSerializedTransferStateProvider() as any;
      const callback = provider.useFactory(
        storeMock,
        transferStateMock,
        config,
        'server',
        featureToggles
      );

      await callback();

      expect(transferStateMock.set).not.toHaveBeenCalled();
    });

    it('should not call transferState.set when config is null', async () => {
      const storeMock = of({ test: 'value' }) as any;
      const transferStateMock = { set: vi.fn() } as any;
      const featureToggles = { ssrTransferStateBeforeAppSerialized: true } as any;

      const provider = getBeforeAppSerializedTransferStateProvider() as any;
      const callback = provider.useFactory(
        storeMock,
        transferStateMock,
        null,
        'server',
        featureToggles
      );

      await callback();

      expect(transferStateMock.set).not.toHaveBeenCalled();
    });

    it('should not call transferState.set when config has no ssrTransfer.keys', async () => {
      const storeMock = of({ test: 'value' }) as any;
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = { state: {} } as StateConfig;
      const featureToggles = { ssrTransferStateBeforeAppSerialized: true } as any;

      const provider = getBeforeAppSerializedTransferStateProvider() as any;
      const callback = provider.useFactory(
        storeMock,
        transferStateMock,
        config,
        'server',
        featureToggles
      );

      await callback();

      expect(transferStateMock.set).not.toHaveBeenCalled();
    });

    it('should not call transferState.set when platformId is browser', async () => {
      const storeMock = of({ test: 'value' }) as any;
      const transferStateMock = { set: vi.fn() } as any;
      const config: StateConfig = {
        state: {
          ssrTransfer: { keys: { test: StateTransferType.TRANSFER_STATE } },
        },
      } as StateConfig;
      const featureToggles = { ssrTransferStateBeforeAppSerialized: true } as any;

      const provider = getBeforeAppSerializedTransferStateProvider() as any;
      const callback = provider.useFactory(
        storeMock,
        transferStateMock,
        config,
        'browser',
        featureToggles
      );

      await callback();

      expect(transferStateMock.set).not.toHaveBeenCalled();
    });
  });
});
