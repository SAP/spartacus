import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Translatable } from '@spartacus/core';
import { Subscription } from 'rxjs';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import {
  GLOBAL_MESSAGE_FEATURE,
  GlobalMessageEntities,
  GlobalMessageState,
  StateWithGlobalMessage,
} from '../global-message-state';
import { GlobalMessageActions } from './../actions/index';
import * as fromReducers from './../reducers/index';
import { GlobalMessageSelectors } from './../selectors/index';

describe('Global Messages selectors', () => {
  let store: Store<StateWithGlobalMessage>;
  let sub: Subscription;

  const testMessageConfirmation: GlobalMessage = {
    text: { raw: 'testConf' },
    type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
  };

  const testMessageConfirmation2: GlobalMessage = {
    text: { raw: 'testConf2' },
    type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
  };

  const testMessageError: GlobalMessage = {
    text: { raw: 'testError' },
    type: GlobalMessageType.MSG_TYPE_ERROR,
  };

  const testMessageWarning: GlobalMessage = {
    text: { raw: 'testWarning' },
    type: GlobalMessageType.MSG_TYPE_WARNING,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          GLOBAL_MESSAGE_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    if (sub) {
      sub.unsubscribe();
    }
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getGlobalMessagesActiveState', () => {
    it('Should return the global Message active state', () => {
      let result: GlobalMessageState;
      sub = store
        .pipe(select(GlobalMessageSelectors.getGlobalMessageState))
        .subscribe((value) => (result = value));
      expect(result).toEqual({ entities: {} });
    });
  });

  describe('getGlobalMessagesEntities', () => {
    it('Should return the list of global messages', () => {
      let result: GlobalMessageEntities;

      sub = store
        .pipe(select(GlobalMessageSelectors.getGlobalMessageEntities))
        .subscribe((value) => {
          result = value;
        });

      expect(result).toEqual({});

      store.dispatch(
        new GlobalMessageActions.AddMessage(testMessageConfirmation)
      );

      expect(result).toEqual({
        [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'testConf' }],
      });
    });
  });

  describe('getGlobalMessageEntitiesByType', () => {
    it('Should return the list of global messages by type', () => {
      let result: Translatable[];

      sub = store
        .pipe(
          select(
            GlobalMessageSelectors.getGlobalMessageEntitiesByType(
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            )
          )
        )
        .subscribe((value) => {
          result = value;
        });

      store.dispatch(new GlobalMessageActions.AddMessage(testMessageError));
      expect(result).toEqual(undefined);
      store.dispatch(new GlobalMessageActions.AddMessage(testMessageWarning));
      expect(result).toEqual(undefined);
      store.dispatch(
        new GlobalMessageActions.AddMessage(testMessageConfirmation)
      );
      expect(result).toEqual([{ raw: 'testConf' }]);
      store.dispatch(
        new GlobalMessageActions.AddMessage(testMessageConfirmation2)
      );
      expect(result).toEqual([{ raw: 'testConf' }, { raw: 'testConf2' }]);
    });
  });

  describe('getGlobalMessageCountByType', () => {
    it('Should return count of global messages by type', () => {
      let result: number;

      sub = store
        .pipe(
          select(
            GlobalMessageSelectors.getGlobalMessageCountByType(
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            )
          )
        )
        .subscribe((value) => {
          result = value;
        });

      store.dispatch(new GlobalMessageActions.AddMessage(testMessageError));
      expect(result).toBe(undefined);
      store.dispatch(new GlobalMessageActions.AddMessage(testMessageWarning));
      expect(result).toBe(undefined);
      store.dispatch(
        new GlobalMessageActions.AddMessage(testMessageConfirmation)
      );
      expect(result).toBe(1);
      store.dispatch(
        new GlobalMessageActions.AddMessage(testMessageConfirmation2)
      );
      expect(result).toBe(2);
    });
  });
});
