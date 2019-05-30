import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import * as fromAction from '../actions/notification-preference.action';
import * as fromEffect from './notification-preference.effect';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserAdapter } from '../../connectors/user/user.adapter';
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
  let userConnector: UserConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.NotificationPreferenceEffects,
        { provide: UserAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    notificationPreferenceEffects = TestBed.get(
      fromEffect.NotificationPreferenceEffects
    );
    userConnector = TestBed.get(UserConnector);
  });

  describe('loadNotificationPreferences$', () => {
    it('should load notification preferences', () => {
      spyOn(userConnector, 'getNotificationPreference').and.returnValue(
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
      spyOn(userConnector, 'getNotificationPreference').and.returnValue(
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
      spyOn(userConnector, 'updateNotificationPreference').and.returnValue(
        of('')
      );
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
      spyOn(userConnector, 'updateNotificationPreference').and.returnValue(
        throwError('Error')
      );

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
