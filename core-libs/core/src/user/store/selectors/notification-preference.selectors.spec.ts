import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../reducers';
import { UsersSelectors } from '../selectors/index';
import { UserActions } from '../actions/index';
import { StateWithUser, USER_FEATURE } from '../user-state';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';

const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];
describe('Notification Preference Selectors', () => {
  let store: Store<StateWithUser>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getPreferencesLoaderState', () => {
    it('should return a notification preference loader', () => {
      let result: LoaderState<NotificationPreference[]>;
      store
        .pipe(select(UsersSelectors.getPreferencesLoaderState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: [],
      });
    });
  });

  describe('getNotificationPreferences', () => {
    it('should return a user payment methods', () => {
      let result: NotificationPreference[];
      store
        .pipe(select(UsersSelectors.getPreferences))
        .subscribe((value) => (result = value));
      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadNotificationPreferencesSuccess(
          mockNotificationPreference
        )
      );
      expect(result).toEqual(mockNotificationPreference);
    });
  });

  describe('getEnabledNotificationPreferences', () => {
    it('should return a enabled preference list', () => {
      let result: NotificationPreference[];
      store
        .pipe(select(UsersSelectors.getEnabledPreferences))
        .subscribe((value) => (result = value));
      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadNotificationPreferencesSuccess(
          mockNotificationPreference
        )
      );
      expect(result).toEqual([]);
    });
  });

  describe('getPreferencesLoading', () => {
    it('should return isLoading flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getPreferencesLoading))
        .subscribe((value) => {
          result = value;
        });
      expect(result).toEqual(false);

      store.dispatch(new UserActions.LoadNotificationPreferences('userId'));
      expect(result).toEqual(true);
    });
  });
});
