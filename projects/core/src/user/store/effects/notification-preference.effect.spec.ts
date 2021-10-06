import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserNotificationPreferenceConnector } from '../../connectors/notification-preference/user-notification-preference.connector';
import { UserNotificationPreferenceAdapter } from '../../connectors/notification-preference/user-notification-preference.adapter';
import { UserActions } from '../actions/index';
import * as fromEffect from './notification-preference.effect';
import { NotificationPreference } from '../../../model/notification-preference.model';

const userId = 'testUser';
const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];
const error = 'anError';

describe('Notification Preference Effect', () => {
  let notificationPreferenceEffects: fromEffect.NotificationPreferenceEffects;
  let userNotificationPreferenceConnector: UserNotificationPreferenceConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.NotificationPreferenceEffects,
        { provide: UserNotificationPreferenceAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    notificationPreferenceEffects = TestBed.inject(
      fromEffect.NotificationPreferenceEffects
    );
    userNotificationPreferenceConnector = TestBed.inject(
      UserNotificationPreferenceConnector
    );
  });

  describe('LoadNotificationPreference$', () => {
    it('should return LoadNotificationPreferencesSuccess action', () => {
      spyOn(userNotificationPreferenceConnector, 'loadAll').and.returnValue(
        of(mockNotificationPreference)
      );

      const action = new UserActions.LoadNotificationPreferences(userId);
      const completion = new UserActions.LoadNotificationPreferencesSuccess(
        mockNotificationPreference
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(notificationPreferenceEffects.loadPreferences$).toBeObservable(
        expected
      );
    });

    it('should return LoadNotificationPreferencesFail action', () => {
      spyOn(userNotificationPreferenceConnector, 'loadAll').and.returnValue(
        throwError(error)
      );

      const action = new UserActions.LoadNotificationPreferences(userId);
      const completion = new UserActions.LoadNotificationPreferencesFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(notificationPreferenceEffects.loadPreferences$).toBeObservable(
        expected
      );
    });
  });

  describe('updateNotificationPreferences$', () => {
    it('should return NotificationPreferencesSuccess action', () => {
      spyOn(userNotificationPreferenceConnector, 'update').and.returnValue(
        of(mockNotificationPreference)
      );

      const action = new UserActions.UpdateNotificationPreferences({
        userId: userId,
        preferences: mockNotificationPreference,
      });
      const completion = new UserActions.UpdateNotificationPreferencesSuccess(
        mockNotificationPreference
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(notificationPreferenceEffects.updatePreferences$).toBeObservable(
        expected
      );
    });

    it('should return NotificationPreferencesFail action', () => {
      spyOn(userNotificationPreferenceConnector, 'update').and.returnValue(
        throwError(error)
      );

      const action = new UserActions.UpdateNotificationPreferences({
        userId: userId,
        preferences: mockNotificationPreference,
      });
      const completion = new UserActions.UpdateNotificationPreferencesFail(
        undefined
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(notificationPreferenceEffects.updatePreferences$).toBeObservable(
        expected
      );
    });
  });
});
