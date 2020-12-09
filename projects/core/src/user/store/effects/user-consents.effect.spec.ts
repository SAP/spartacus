import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { GlobalMessageActions } from '../../../global-message/store/actions';
import { ConsentTemplate } from '../../../model/consent.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserConsentAdapter } from '../../connectors/index';
import { UserConsentService } from '../../facade';
import { UserActions } from '../actions/index';
import * as fromEffect from './user-consents.effect';

class MockOccUserAdapter {
  loadConsents(_userId: string): Observable<ConsentTemplate[]> {
    return of();
  }
  loadConsent(
    _userId: string,
    _templateId: string
  ): Observable<ConsentTemplate> {
    return of();
  }
  giveConsent(
    _userId: string,
    _consentTemplateId: string,
    _consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    return of();
  }
  withdrawConsent(_userId: string, _consentCode: string): Observable<{}> {
    return of();
  }
}

class MockUserConsentService implements Partial<UserConsentService> {
  loadConsent() {
    return Promise.resolve();
  }
}

describe('User Consents effect', () => {
  let userConsentEffect: fromEffect.UserConsentsEffect;
  let userConsentAdapter: UserConsentAdapter;
  let actions$: Observable<Action>;
  let userConsentService: UserConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.UserConsentsEffect,
        { provide: UserConsentAdapter, useClass: MockOccUserAdapter },
        provideMockActions(() => actions$),
        { provide: UserConsentService, useClass: MockUserConsentService },
      ],
    });

    userConsentEffect = TestBed.inject(fromEffect.UserConsentsEffect);
    userConsentAdapter = TestBed.inject(UserConsentAdapter);
    userConsentService = TestBed.inject(UserConsentService);
  });

  describe('getConsents$', () => {
    const userId = 'xxx@xxx.xxx';
    const templateList: ConsentTemplate[] = [
      {
        id: 'xxx',
      },
    ];
    it('should return LoadUserConsentsSuccess', () => {
      spyOn(userConsentAdapter, 'loadConsents').and.returnValue(
        of(templateList)
      );

      const action = new UserActions.LoadUserConsents(userId);
      const completion = new UserActions.LoadUserConsentsSuccess(templateList);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.getConsents$).toBeObservable(expected);
    });
  });

  describe('getConsent$', () => {
    const userId = 'xxx@xxx.xxx';
    const templateId = 'yyy';
    const template: ConsentTemplate = {
      id: 'xxx',
    };
    it('should return LoadUserConsentSuccess', () => {
      spyOn(userConsentAdapter, 'loadConsent').and.returnValue(of(template));

      const action = new UserActions.LoadUserConsent({ userId, templateId });
      const completion = new UserActions.LoadUserConsentSuccess(template);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.getConsent$).toBeObservable(expected);
    });
  });

  describe('giveConsent$', () => {
    const userId = 'xxx@xxx.xxx';
    const consentTemplateId = 'xxx';
    const consentTemplateVersion = 0;
    const consentTemplate: ConsentTemplate = {
      id: consentTemplateId,
      version: consentTemplateVersion,
    };
    it('should return GiveUserConsentSuccess', () => {
      spyOn(userConsentAdapter, 'giveConsent').and.returnValue(
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

      expect(userConsentEffect.giveConsent$).toBeObservable(expected);
    });

    it('should close error message on 409 for TRANSFER_ANONYMOUS_CONSENT action', () => {
      const mockError = {
        status: 409,
        msg: 'Mock error',
      };
      spyOn(userConsentAdapter, 'giveConsent').and.returnValue(
        throwError(mockError)
      );

      const action = new UserActions.TransferAnonymousConsent({
        userId,
        consentTemplateId,
        consentTemplateVersion,
      });
      const completion = new UserActions.GiveUserConsentFail(
        normalizeHttpError(mockError)
      );
      const closeMessage = new GlobalMessageActions.RemoveMessagesByType(
        GlobalMessageType.MSG_TYPE_ERROR
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion, c: closeMessage });

      expect(userConsentEffect.giveConsent$).toBeObservable(expected);
    });

    it('should close error message on 409 with AlreadyExistsError and should reload consent', () => {
      const mockError = new HttpErrorResponse({
        error: { errors: [{ type: 'AlreadyExistsError' }] },
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 409,
        statusText: 'Mock error',
        url: '/xxx',
      });
      spyOn(userConsentAdapter, 'giveConsent').and.returnValue(
        throwError(mockError)
      );
      spyOn(userConsentService, 'loadConsent');

      const action = new UserActions.TransferAnonymousConsent({
        userId,
        consentTemplateId,
        consentTemplateVersion,
      });
      const completion = new UserActions.GiveUserConsentFail(
        normalizeHttpError(mockError)
      );
      const closeMessage = new GlobalMessageActions.RemoveMessagesByType(
        GlobalMessageType.MSG_TYPE_ERROR
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: completion,
        c: closeMessage,
        d: closeMessage,
      });

      expect(userConsentEffect.giveConsent$).toBeObservable(expected);
      expect(userConsentService.loadConsent).toHaveBeenCalledWith(
        userId,
        consentTemplateId
      );
    });

    it('should not close error message for GIVE_USER_CONSENT action', () => {
      const mockError = {
        status: 409,
        msg: 'Mock error',
      };
      spyOn(userConsentAdapter, 'giveConsent').and.returnValue(
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

      expect(userConsentEffect.giveConsent$).toBeObservable(expected);
    });
  });

  describe('withdrawConsent$', () => {
    const userId = 'xxx@xxx.xxx';
    const consentTemplateId = 'yyy';
    const consentCode = 'xxx';
    it('should return WithdrawUserConsentSuccess', () => {
      spyOn(userConsentAdapter, 'withdrawConsent').and.returnValue(of({}));

      const action = new UserActions.WithdrawUserConsent({
        userId: userId,
        consentCode: consentCode,
        consentTemplateId: consentTemplateId,
      });
      const completion = new UserActions.WithdrawUserConsentSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.withdrawConsent$).toBeObservable(expected);
    });
    it('should reload consent on 400 and ConsentWithdrawnError', () => {
      const mockError = new HttpErrorResponse({
        error: { errors: [{ type: 'ConsentWithdrawnError' }] },
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 400,
        statusText: 'Mock error',
        url: '/xxx',
      });
      spyOn(userConsentAdapter, 'withdrawConsent').and.returnValue(
        throwError(mockError)
      );
      spyOn(userConsentService, 'loadConsent');
      const action = new UserActions.WithdrawUserConsent({
        userId: userId,
        consentCode: consentCode,
        consentTemplateId: consentTemplateId,
      });
      const completion = new UserActions.WithdrawUserConsentFail(
        normalizeHttpError(mockError)
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.withdrawConsent$).toBeObservable(expected);
      expect(userConsentService.loadConsent).toHaveBeenCalledWith(
        userId,
        consentTemplateId
      );
    });
  });

  describe('resetConsents$', () => {
    it('should return ResetLoadUserConsents', () => {
      const action = new SiteContextActions.LanguageChange({
        previous: 'previous',
        current: 'current',
      });
      const completion = new UserActions.ResetLoadUserConsents();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.resetConsents$).toBeObservable(expected);
    });
  });
});
