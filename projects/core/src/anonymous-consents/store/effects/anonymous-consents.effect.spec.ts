import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { UserActions } from 'projects/core/src/user';
import { Observable, of } from 'rxjs';
import { AuthActions, AuthService, UserToken } from '../../../auth/index';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../../model/consent.model';
import { SiteContextActions } from '../../../site-context/index';
import { AnonymousConsentsConfig } from '../../config/anonymous-consents-config';
import { AnonymousConsentTemplatesConnector } from '../../connectors/index';
import { AnonymousConsentsService } from '../../facade';
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

  getOccUserId(): Observable<string> {
    return of();
  }
}

const mockTemplateList: ConsentTemplate[] = [
  {
    id: 'xxx',
    description: 'store user info consent template',
    version: 0,
  },
];

const mockAnonymousConsent: AnonymousConsent = {
  templateCode: 'xxx',
  consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
  version: 0,
};

const mockUserToken = {
  access_token: 'yyy',
} as UserToken;

class MockAnonymousConsentsService {
  getAnonymousConsent(_templateCode: string): Observable<AnonymousConsent> {
    return of();
  }

  getAnonymousConsentTemplate(
    _templateCode: string
  ): Observable<ConsentTemplate> {
    return of();
  }
}

const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
  },
};

fdescribe('AnonymousConsentsEffects', () => {
  let effect: fromEffect.AnonymousConsentsEffects;
  let connector: MockAnonymousConsentTemplatesConnector;
  let actions$: Observable<Action>;
  let anonymousConsentsService: AnonymousConsentsService;
  let userService: AuthService;

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
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
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
    anonymousConsentsService = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);
    userService = TestBed.get(AuthService as Type<AuthService>);
  });

  describe('handleLanguageChange$', () => {
    it('should return AnonymousConsentsActions.LoadAnonymousConsentTemplates action when the user is anonymous', () => {
      const action = new SiteContextActions.LanguageChange();
      const completion = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.handleLanguageChange$).toBeObservable(expected);
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

  describe('transferAnonymousConsentsToUser$', () => {
    it('should return GiveUserAnonymousConsent', () => {
      spyOn(anonymousConsentsService, 'getAnonymousConsent').and.returnValue(
        of(mockAnonymousConsent)
      );
      spyOn(
        anonymousConsentsService,
        'getAnonymousConsentTemplate'
      ).and.returnValue(of(mockTemplateList[0]));
      spyOn(userService, 'getOccUserId').and.returnValue(of('current'));

      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );
      const registerSuccessAction = new UserActions.RegisterUserSuccess();

      const completion = new UserActions.GiveUserAnonymousConsent({
        userId: 'current',
        consentTemplateId: '',
        consentTemplateVersion: 0,
      });

      actions$ = hot('-(ab)', {
        a: loadUserTokenSuccessAction,
        b: registerSuccessAction,
      });
      const expected = cold('-c', { c: completion });

      expect(effect.transferAnonymousConsentsToUser$).toBeObservable(expected);
    });
  });
});
