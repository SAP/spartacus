import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { NotificationPreference } from '../../model/notification-preference.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserNotificationPreferenceService } from './user-notification-preference.service';

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UserNotificationPreferenceService', () => {
  let userNotificationPreferenceService: UserNotificationPreferenceService;
  let store: Store<StateWithUser>;
  const mockNotificationPreference: NotificationPreference[] = [
    {
      channel: 'EMAIL',
      value: 'test@sap.com',
      enabled: false,
      visible: true,
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UserNotificationPreferenceService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    userNotificationPreferenceService = TestBed.inject(
      UserNotificationPreferenceService
    );
  });

  it('should UserNotificationPreferenceService is injected', inject(
    [UserNotificationPreferenceService],
    (service: UserNotificationPreferenceService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be able to get notification preferences', () => {
    store.dispatch(
      new UserActions.LoadNotificationPreferencesSuccess(
        mockNotificationPreference
      )
    );
    let notificationPreferences: NotificationPreference[];
    userNotificationPreferenceService
      .getPreferences()
      .subscribe((preferences) => {
        notificationPreferences = preferences;
      })
      .unsubscribe();
    expect(notificationPreferences).toEqual(mockNotificationPreference);
  });

  it('should be able to get enabled notification preferences', () => {
    store.dispatch(
      new UserActions.LoadNotificationPreferencesSuccess(
        mockNotificationPreference
      )
    );
    userNotificationPreferenceService
      .getEnabledPreferences()
      .subscribe((preferences) => expect(preferences).toEqual([]))
      .unsubscribe();
  });

  it('should be able to load notification preferences', () => {
    userNotificationPreferenceService.loadPreferences();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadNotificationPreferences(OCC_USER_ID_CURRENT)
    );
  });

  it('should be able to get notification preferences loading flag', () => {
    store.dispatch(
      new UserActions.LoadNotificationPreferencesSuccess(
        mockNotificationPreference
      )
    );

    let notificationPreferenceLoading: boolean;
    userNotificationPreferenceService
      .getPreferencesLoading()
      .subscribe((loading) => {
        notificationPreferenceLoading = loading;
      })
      .unsubscribe();
    expect(notificationPreferenceLoading).toEqual(false);
  });

  it('should be able to update notification preferences', () => {
    userNotificationPreferenceService.updatePreferences(
      mockNotificationPreference
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.UpdateNotificationPreferences({
        userId: OCC_USER_ID_CURRENT,
        preferences: mockNotificationPreference,
      })
    );
  });

  it('sshould be able to get update notification preferences loading flag', () => {
    store.dispatch(
      new UserActions.UpdateNotificationPreferences({
        userId: OCC_USER_ID_CURRENT,
        preferences: mockNotificationPreference,
      })
    );

    let result = false;
    userNotificationPreferenceService
      .getUpdatePreferencesResultLoading()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should be able to reset notification preferences', () => {
    userNotificationPreferenceService.resetNotificationPreferences();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ResetNotificationPreferences()
    );
  });

  it('should be able to clear notification preferences', () => {
    userNotificationPreferenceService.clearPreferences();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClearNotificationPreferences()
    );
  });
});
