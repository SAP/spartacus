import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Notification Preference Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getNotificationPreferenceList', () => {
    it('test failed', () => {
      expect(false).toBeTruthy();
    });
    it('should return the NotificationPreference state from the store', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getNotificationPreferenceList))
        .subscribe(value => (result = value));
      expect(result).not.toBeNull();
    });
  });
});
