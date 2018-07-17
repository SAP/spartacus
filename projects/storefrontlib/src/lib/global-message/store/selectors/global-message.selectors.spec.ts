import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { TestBed } from '@angular/core/testing';

describe('Global Messages selectors', () => {
  let store: Store<fromReducers.GlobalMessageState>;

  const testMessage: any = {
    message_text: 'test',
    severity_level: 'test'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          globalMessage: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getGlobalMessageActiveState', () => {
    it('should return the global Message active state', () => {
      let result: any;
      store
        .select(fromSelectors.getGlobalMessageActiveState)
        .subscribe(value => (result = value));

      expect(result).toEqual({ messages: [] });
    });
  });

  describe('getGlobalMessages', () => {
    it('should return the list of global messages', () => {
      let result: any;
      store.select(fromSelectors.getGlobalMessages).subscribe(value => {
        result = value;
      });

      expect(result).toEqual([]);

      store.dispatch(new fromActions.AddMessage(testMessage));

      expect(result).toEqual([testMessage]);
    });
  });
});
