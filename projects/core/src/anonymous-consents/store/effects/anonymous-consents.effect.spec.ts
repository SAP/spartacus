import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthActions, AuthService } from '../../../auth/index';
import { ConsentTemplate } from '../../../model/consent.model';
import { SiteContextActions } from '../../../site-context/index';
import { AnonymousConsentTemplatesConnector } from '../../connectors/index';
import { AnonymousConsentsActions } from '../actions/index';
import * as fromEffect from './anonymous-consents.effect';

class MockAnonymousConsentTemplatesConnector {
  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
}

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

const mockTemplateList: ConsentTemplate[] = [
  {
    id: 'xxx',
  },
];

describe('AnonymousConsentsEffects', () => {
  let effect: fromEffect.AnonymousConsentsEffects;
  let connector: MockAnonymousConsentTemplatesConnector;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.AnonymousConsentsEffects,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: AnonymousConsentTemplatesConnector,
          useClass: MockAnonymousConsentTemplatesConnector,
        },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(fromEffect.AnonymousConsentsEffects as Type<
      fromEffect.AnonymousConsentsEffects
    >);
    connector = TestBed.get(AnonymousConsentTemplatesConnector as Type<
      AnonymousConsentTemplatesConnector
    >);
  });

  describe('handleLogoutAndLanguageChange$', () => {
    describe('when the language changes while the user is anonymous', () => {
      it('should return AnonymousConsentsActions.LoadAnonymousConsentTemplates action', () => {
        const action = new SiteContextActions.LanguageChange();
        const completion = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effect.handleLogoutAndLanguageChange$).toBeObservable(expected);
      });
    });
    describe('when the user logs out', () => {
      it('should return AnonymousConsentsActions.LoadAnonymousConsentTemplates action', () => {
        const action = new AuthActions.Logout();
        const completion = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(effect.handleLogoutAndLanguageChange$).toBeObservable(expected);
      });
    });
  });

  describe('loadAnonymousConsentTemplates$', () => {
    it('should return LoadAnonymousConsentTemplatesSuccess and InitializeAnonymousConsents', () => {
      spyOn(connector, 'loadAnonymousConsentTemplates').and.returnValue(
        of(mockTemplateList)
      );

      const action = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();
      const completion = new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockTemplateList
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadAnonymousConsentTemplates$).toBeObservable(expected);
    });
  });
});
