import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  ConsentTemplate,
  GlobalMessageService,
  UserActions,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { CdcUserConsentConnector } from '../connector/consent';
import * as fromEffect from './cdc-user-consents.effect';

const consentTemplateId = 'xxx';
const consentTemplateVersion = 0;
const consentTemplate: ConsentTemplate = {
  id: consentTemplateId,
  version: consentTemplateVersion,
};
const mockError = {
  errorCode: 409,
  errorMessage: 'Mock error',
};
const expected = cold('');
class MockCdcUserConsentConnector implements Partial<CdcUserConsentConnector> {
  updateCdcConsent(_isConsentGranted: boolean, _consentCode: string) {
    return EMPTY;
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(): void {}
}

describe('CdcUserConsentsEffects', () => {
  let cdcUserConsentEffect: fromEffect.CdcUserConsentsEffects;
  let cdcUserConsentConnector: CdcUserConsentConnector;
  let globalMessageService: GlobalMessageService;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.CdcUserConsentsEffects,
        {
          provide: CdcUserConsentConnector,
          useClass: MockCdcUserConsentConnector,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    cdcUserConsentEffect = TestBed.inject(fromEffect.CdcUserConsentsEffects);
    cdcUserConsentConnector = TestBed.inject(CdcUserConsentConnector);
    globalMessageService = TestBed.inject(GlobalMessageService);
    spyOn(globalMessageService, 'add').and.stub();
  });

  describe('giveCdcConsent$', () => {
    it('should invoke cdc to give consent', () => {
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        of({})
      );

      const action = new UserActions.GiveUserConsentSuccess(consentTemplate);

      actions$ = hot('-a', { a: action });

      expect(cdcUserConsentEffect.giveCdcConsent$).toBeObservable();
      expect(cdcUserConsentConnector.updateCdcConsent).toHaveBeenCalledWith(
        true,
        consentTemplateId
      );
    });

    it('should show error message', () => {
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        throwError(mockError)
      );

      const action = new UserActions.GiveUserConsentSuccess(consentTemplate);

      actions$ = hot('-a', { a: action });

      expect(cdcUserConsentEffect.giveCdcConsent$).toBeObservable(expected);
      expect(cdcUserConsentConnector.updateCdcConsent).toHaveBeenCalledWith(
        true,
        consentTemplateId
      );
      expect(cdcUserConsentEffect.showErrorMessage).toHaveBeenCalledWith(
        mockError
      );
    });
  });

  describe('withdrawCdcConsent$', () => {
    it('should invoke cdc to withdraw consent', () => {
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        of({})
      );

      const action = new UserActions.WithdrawUserConsentSuccess(
        consentTemplateId
      );

      actions$ = hot('-a', { a: action });

      expect(cdcUserConsentEffect.withdrawCdcConsent$).toBeObservable(expected);
      expect(cdcUserConsentConnector.updateCdcConsent).toHaveBeenCalledWith(
        false,
        consentTemplateId
      );
    });
    it('should show error message', () => {
      spyOn(cdcUserConsentConnector, 'updateCdcConsent').and.returnValue(
        throwError(mockError)
      );

      const action = new UserActions.WithdrawUserConsentSuccess(
        consentTemplateId
      );

      actions$ = hot('-a', { a: action });

      expect(cdcUserConsentEffect.withdrawCdcConsent$).toBeObservable(expected);
      expect(cdcUserConsentConnector.updateCdcConsent).toHaveBeenCalledWith(
        false,
        consentTemplateId
      );
      expect(cdcUserConsentEffect.showErrorMessage).toHaveBeenCalledWith(
        mockError
      );
    });
  });
});
