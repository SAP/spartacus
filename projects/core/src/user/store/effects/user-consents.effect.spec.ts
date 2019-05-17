import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConsentTemplate, ConsentTemplateList } from '../../../occ';
import { UserAccountAdapter } from '../../connectors';
import * as fromAction from '../actions/user-consents.action';
import * as fromEffect from './user-consents.effect';

class MockOccUserAdapter {
  loadConsents(_userId: string): Observable<ConsentTemplateList> {
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

describe('User Consents effect', () => {
  let userConsentEffect: fromEffect.UserConsentsEffect;
  let userAccountAdapter: UserAccountAdapter;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.UserConsentsEffect,
        { provide: UserAccountAdapter, useClass: MockOccUserAdapter },
        provideMockActions(() => actions$),
      ],
    });

    userConsentEffect = TestBed.get(fromEffect.UserConsentsEffect);
    userAccountAdapter = TestBed.get(UserAccountAdapter);
  });

  describe('getConsents$', () => {
    const userId = 'xxx@xxx.xxx';
    const templateList: ConsentTemplateList = {
      consentTemplates: [
        {
          id: 'xxx',
        },
      ],
    };
    it('should return LoadUserConsentsSuccess', () => {
      spyOn(userAccountAdapter, 'loadConsents').and.returnValue(
        of(templateList)
      );

      const action = new fromAction.LoadUserConsents(userId);
      const completion = new fromAction.LoadUserConsentsSuccess(templateList);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.getConsents$).toBeObservable(expected);
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
      spyOn(userAccountAdapter, 'giveConsent').and.returnValue(
        of(consentTemplate)
      );

      const action = new fromAction.GiveUserConsent({
        userId,
        consentTemplateId,
        consentTemplateVersion,
      });
      const completion = new fromAction.GiveUserConsentSuccess(consentTemplate);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.giveConsent$).toBeObservable(expected);
    });
  });

  describe('withdrawConsent$', () => {
    it('should return WithdrawUserConsentSuccess', () => {
      spyOn(userAccountAdapter, 'withdrawConsent').and.returnValue(of({}));

      const action = new fromAction.WithdrawUserConsent({
        userId: 'xxx@xxx.xxx',
        consentCode: 'xxx',
      });
      const completion = new fromAction.WithdrawUserConsentSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(userConsentEffect.withdrawConsent$).toBeObservable(expected);
    });
  });
});
