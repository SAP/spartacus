import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromNotificationPreferenceEffect from './notification-preference.effect';
import * as fromNotificationPreferenceAction from '../actions/notification-preference.action';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { OccUserService } from '../../occ/index';
import { OccConfig } from '../../../occ/config/occ-config';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
  },
};

const notificationpreferences: any = {
  preferences: [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
    },
    {
      channel: 'SMS',
      enabled: true,
      value: '1300000381',
    },
  ],
};

const userId = 'test@sap.com';

const toBeUpdate: any = {
  userId: userId,
  preferences: [{ channel: 'EMAIL', enabled: false }],
};

describe('Notification Preference Effect', () => {
  let notificationPreferenceEffects: fromNotificationPreferenceEffect.NotificationPreferenceEffects;
  let userService: OccUserService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserService,
        fromNotificationPreferenceEffect.NotificationPreferenceEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    notificationPreferenceEffects = TestBed.get(
      fromNotificationPreferenceEffect.NotificationPreferenceEffects
    );
    userService = TestBed.get(OccUserService);
  });

  describe('loadNotificationPreferences$', () => {
    it('test failed', () => {
      expect(false).toBeTruthy();
    });

    it('should load notification preferences', () => {
      spyOn(userService, 'getNotificationPreference').and.returnValue(
        of(notificationpreferences)
      );
      const action = new fromNotificationPreferenceAction.LoadNotificationPreferences(
        userId
      );

      const completion = new fromNotificationPreferenceAction.LoadNotificationPreferencesSuccess(
        notificationpreferences
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        notificationPreferenceEffects.loadNotificationPreferences$
      ).toBeObservable(expected);
    });

    it('should handle failures for load notification preferences', () => {
      spyOn(userService, 'getNotificationPreference').and.returnValue(
        throwError('Error')
      );

      const action = new fromNotificationPreferenceAction.LoadNotificationPreferences(
        userId
      );

      const completion = new fromNotificationPreferenceAction.LoadNotificationPreferencesFail(
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
      spyOn(userService, 'updateNotificationPreference').and.returnValue(
        of('')
      );
      const action = new fromNotificationPreferenceAction.UpdateNotificationPreferences(
        toBeUpdate
      );

      const completion = new fromNotificationPreferenceAction.UpdateNotificationPreferencesSuccess(
        ''
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        notificationPreferenceEffects.updateNotificationPreferences$
      ).toBeObservable(expected);
    });

    it('should handle failures for update notification preferences', () => {
      spyOn(userService, 'updateNotificationPreference').and.returnValue(
        throwError('Error')
      );

      const action = new fromNotificationPreferenceAction.UpdateNotificationPreferences(
        toBeUpdate
      );

      const completion = new fromNotificationPreferenceAction.UpdateNotificationPreferencesFail(
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
