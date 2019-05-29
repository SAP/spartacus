import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import * as fromAction from '../actions/notification-preference.action';
import * as fromEffect from './notification-preference.effect';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { UserAccountConnector } from '../../connectors/account/user-account.connector';
import { UserAccountAdapter } from '../../connectors/account/user-account.adapter';
import { BasicNotificationPreferenceList } from '../../../model/notification-preference.model';

const notificationPreferenceList: BasicNotificationPreferenceList = {
  preferences: [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
      visible: true,
    },
    {
      channel: 'SMS',
      enabled: true,
      value: '1300000381',
      visible: true,
    },
  ],
};

const userId = 'test@sap.com';

const toBeUpdate: any = {
  userId: userId,
  basicNotificationPreferenceList: notificationPreferenceList,
};

describe('Notification Preference Effect', () => {
  let notificationPreferenceEffects: fromEffect.NotificationPreferenceEffects;
  let userAccountConnector: UserAccountConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.NotificationPreferenceEffects,
        { provide: UserAccountAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    notificationPreferenceEffects = TestBed.get(
      fromEffect.NotificationPreferenceEffects
    );
    userAccountConnector = TestBed.get(UserAccountConnector);
  });

  describe('loadNotificationPreferences$', () => {
    it('should load notification preferences', () => {
      spyOn(userAccountConnector, 'getNotificationPreference').and.returnValue(
        of(notificationPreferenceList)
      );
      const action = new fromAction.LoadNotificationPreferences(userId);

      const completion = new fromAction.LoadNotificationPreferencesSuccess(
        notificationPreferenceList
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        notificationPreferenceEffects.loadNotificationPreferences$
      ).toBeObservable(expected);
    });

    it('should handle failures for load notification preferences', () => {
      spyOn(userAccountConnector, 'getNotificationPreference').and.returnValue(
        throwError('Error')
      );

      const action = new fromAction.LoadNotificationPreferences(userId);

      const completion = new fromAction.LoadNotificationPreferencesFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        notificationPreferenceEffects.loadNotificationPreferences$
      ).toBeObservable(expected);
    });
  });

  describe('updateNotificationPreferences$', () => {
    it('should update notification preferences', () => {
      spyOn(
        userAccountConnector,
        'updateNotificationPreference'
      ).and.returnValue(of(''));
      const action = new fromAction.UpdateNotificationPreferences(toBeUpdate);

      const completion = new fromAction.UpdateNotificationPreferencesSuccess(
        notificationPreferenceList
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        notificationPreferenceEffects.updateNotificationPreferences$
      ).toBeObservable(expected);
    });

    it('should handle failures for update notification preferences', () => {
      spyOn(
        userAccountConnector,
        'updateNotificationPreference'
      ).and.returnValue(throwError('Error'));

      const action = new fromAction.UpdateNotificationPreferences(toBeUpdate);

      const completion = new fromAction.UpdateNotificationPreferencesFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        notificationPreferenceEffects.updateNotificationPreferences$
      ).toBeObservable(expected);
    });
  });
});
