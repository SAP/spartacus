import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { TestBed } from '@angular/core/testing';

import {
  GlobalMessage,
  GlobalMessageType
} from '../../models/global-message.model';
import {
  GlobalMessageState,
  GLOBAL_MESSAGE_FEATURE,
  StateWithGlobalMessage
} from '../../store/global-message-state';

describe('Global Messages selectors', () => {
  let store: Store<StateWithGlobalMessage>;

  const testMessage: GlobalMessage = {
    text: 'test',
    type: GlobalMessageType.MSG_TYPE_CONFIRMATION
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          GLOBAL_MESSAGE_FEATURE,
          fromReducers.getReducers()
        )
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getGlobalMessagesActiveState', () => {
    it('should return the global Message active state', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getGlobalMessageState))
        .subscribe(value => (result = value));
      expect(result).toEqual({ entities: {} });
    });
  });

  describe('getGlobalMessagesEntities', () => {
    it('should return the list of global messages', () => {
      let result: any;

      store
        .pipe(select(fromSelectors.getGlobalMessageEntities))
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual({});

      store.dispatch(new fromActions.AddMessage(testMessage));

      expect(result).toEqual({
        [GlobalMessageType.MSG_TYPE_CONFIRMATION]: ['test']
      });
    });
  });
});
