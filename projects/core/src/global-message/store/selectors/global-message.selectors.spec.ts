import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from './../reducers/index';
import * as fromSelectors from './../selectors/index';
import * as fromActions from './../actions/index';
import { TestBed } from '@angular/core/testing';

import {
  GlobalMessageType,
  GlobalMessage,
} from '../../models/global-message.model';
import {
  GLOBAL_MESSAGE_FEATURE,
  StateWithGlobalMessage,
  GlobalMessageState,
  GlobalMessageEntities,
} from '../global-message-state';
import { Translatable } from '@spartacus/core';

describe('Global Messages selectors', () => {
  let store: Store<StateWithGlobalMessage>;

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

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getGlobalMessagesActiveState', () => {
    it('Should return the global Message active state', () => {
      let result: GlobalMessageState;
      store
        .pipe(select(fromSelectors.getGlobalMessageState))
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual({ entities: {} });
    });
  });

  describe('getGlobalMessagesEntities', () => {
    it('Should return the list of global messages', () => {
      let result: GlobalMessageEntities;

      store
        .pipe(select(fromSelectors.getGlobalMessageEntities))
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual({});

      store.dispatch(new fromActions.AddMessage(testMessageConfirmation));

      expect(result).toEqual({
        [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'testConf' }],
      });
    });
  });

  describe('getGlobalMessageEntitiesByType', () => {
    it('Should return the list of global messages by type', () => {
      let result: Translatable[];

      store
        .pipe(
          select(
            fromSelectors.getGlobalMessageEntitiesByType(
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            )
          )
        )
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      store.dispatch(new fromActions.AddMessage(testMessageError));
      expect(result).toEqual(undefined);
      store.dispatch(new fromActions.AddMessage(testMessageConfirmation));
      expect(result).toEqual([{ raw: 'testConf' }]);
      store.dispatch(new fromActions.AddMessage(testMessageConfirmation2));
      expect(result).toEqual([{ raw: 'testConf' }, { raw: 'testConf2' }]);
    });
  });

  describe('getGlobalMessageCountByType', () => {
    it('Should return count of global messages by type', () => {
      let result: number;

      store
        .pipe(
          select(
            fromSelectors.getGlobalMessageCountByType(
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            )
          )
        )
        .subscribe(value => {
          result = value;
        })
        .unsubscribe();

      store.dispatch(new fromActions.AddMessage(testMessageError));
      expect(result).toBe(undefined);
      store.dispatch(new fromActions.AddMessage(testMessageConfirmation));
      expect(result).toBe(1);
      store.dispatch(new fromActions.AddMessage(testMessageConfirmation2));
      expect(result).toBe(2);
    });
  });
});
