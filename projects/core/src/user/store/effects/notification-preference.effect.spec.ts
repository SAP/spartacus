import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as fromNotificationPreferenceEffect from './notification-preference.effect';
import * as fromNotificationPreferenceAction from '../actions/notification-preference.action';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { UserAccountConnector } from '../../connectors/account/user-account.connector';
import { OccConfig } from '../../../occ/config/occ-config';
import { BasicNotificationPreferenceList } from 'projects/core/src/model/notification-preference.model';

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

const basicNotificationPreferenceList: BasicNotificationPreferenceList = {
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
  basicNotificationPreferenceList: basicNotificationPreferenceList,
};

describe('Notification Preference Effect', () => {
  let notificationPreferenceEffects: fromNotificationPreferenceEffect.NotificationPreferenceEffects;
  let userAccountConnector: UserAccountConnector;
  let actions$: Observable<BasicNotificationPreferenceList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        userAccountConnector,
        fromNotificationPreferenceEffect.NotificationPreferenceEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    notificationPreferenceEffects = TestBed.get(
      fromNotificationPreferenceEffect.NotificationPreferenceEffects
    );
    userAccountConnector = TestBed.get(UserAccountConnector);
  });

  describe('loadNotificationPreferences$', () => {
    it('should load notification preferences', () => {
      spyOn(userAccountConnector, 'getNotificationPreference').and.returnValue(
        of(basicNotificationPreferenceList)
      );
      const action = new fromNotificationPreferenceAction.LoadNotificationPreferences(
        userId
      );

      const completion = new fromNotificationPreferenceAction.LoadNotificationPreferencesSuccess(
        basicNotificationPreferenceList
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
      spyOn(
        userAccountConnector,
        'updateNotificationPreference'
      ).and.returnValue(of(''));
      const action = new fromNotificationPreferenceAction.UpdateNotificationPreferences(
        toBeUpdate
      );

      const completion = new fromNotificationPreferenceAction.UpdateNotificationPreferencesSuccess(
        basicNotificationPreferenceList
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
