import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  ConsentTemplate,
  normalizeHttpError,
  UserActions,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { CdcUserConsentConnector } from '../connector/consent';
import * as fromEffect from './cdc-user-consents.effect';

class MockCdcUserConsentConnector implements Partial<CdcUserConsentConnector> {
  updateCdcConsent(
    _userId: string,
    _isConsentGranted: boolean,
    _consentCode: string
  ): Observable<{}> {
    return EMPTY;
  }
}

describe('User Consents effect', () => {
  let cdcUserConsentEffect: fromEffect.CdcUserConsentsEffects;
  let cdcUserConsentConnector: CdcUserConsentConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.CdcUserConsentsEffects,
        {
          provide: CdcUserConsentConnector,
          useClass: MockCdcUserConsentConnector,
        },
        provideMockActions(() => actions$),
      ],
    });

    cdcUserConsentEffect = TestBed.inject(fromEffect.CdcUserConsentsEffects);
    cdcUserConsentConnector = TestBed.inject(CdcUserConsentConnector);
  });

  describe('giveCdcConsent$', () => {
    const userId = 'xxx@xxx.xxx';
    const consentTemplateId = 'xxx';
    const consentTemplateVersion = 0;
    const consentTemplate: ConsentTemplate = {
      id: consentTemplateId,
      version: consentTemplateVersion,
    };
    it('should return GiveUserConsentSuccess', () => {
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        of(consentTemplate)
      );

      const action = new UserActions.GiveUserConsent({
        userId,
        consentTemplateId,
        consentTemplateVersion,
      });
      const completion = new UserActions.GiveUserConsentSuccess(
        consentTemplate
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cdcUserConsentEffect.giveCdcConsent$).toBeObservable(expected);
    });

    it('should not close error message for GIVE_USER_CONSENT action', () => {
      const mockError = {
        status: 409,
        msg: 'Mock error',
      };
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        throwError(mockError)
      );

      const action = new UserActions.GiveUserConsent({
        userId,
        consentTemplateId,
        consentTemplateVersion,
      });
      const completion = new UserActions.GiveUserConsentFail(
        normalizeHttpError(mockError)
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cdcUserConsentEffect.giveCdcConsent$).toBeObservable(expected);
    });
  });

  describe('withdrawCdcConsent$', () => {
    it('should return WithdrawUserConsentSuccess', () => {
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        of({})
      );

      const action = new UserActions.WithdrawUserConsent({
        userId: 'xxx@xxx.xxx',
        consentCode: 'xxx',
      });
      const completion = new UserActions.WithdrawUserConsentSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(cdcUserConsentEffect.withdrawCdcConsent$).toBeObservable(expected);
    });
  });
});
