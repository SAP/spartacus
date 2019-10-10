import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthActions, AuthService, UserToken } from '../../../auth/index';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../../model/consent.model';
import { SiteContextActions } from '../../../site-context/index';
import { UserActions } from '../../../user/store/actions';
import { AnonymousConsentsConfig } from '../../config/anonymous-consents-config';
import { AnonymousConsentTemplatesConnector } from '../../connectors/index';
import { AnonymousConsentsService } from '../../facade/index';
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

class MockAnonymousConsentsService {
  detectUpdatedTemplates(
    _currentTemplates: ConsentTemplate[],
    _newTemplates: ConsentTemplate[]
  ): boolean {
    return false;
  }
  getAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
  getAnonymousConsent(_templateCode: string): Observable<AnonymousConsent> {
    return of();
  }
  getAnonymousConsentTemplate(
    _templateCode: string
  ): Observable<ConsentTemplate> {
    return of();
  }
  giveAnonymousConsent(_templateCode: string): void {}
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

const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
    requiredConsents: [mockTemplateList[0].id],
  },
};

describe('AnonymousConsentsEffects', () => {
  let effect: fromEffect.AnonymousConsentsEffects;
  let connector: MockAnonymousConsentTemplatesConnector;
  let actions$: Observable<Action>;
  let authService: AuthService;
  let anonymousConsentService: AnonymousConsentsService;

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
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
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
    anonymousConsentService = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);
    authService = TestBed.get(AuthService as Type<AuthService>);
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
    it('should return LoadAnonymousConsentTemplatesSuccess and ToggleAnonymousConsentTemplatesUpdated', () => {
      spyOn(connector, 'loadAnonymousConsentTemplates').and.returnValue(
        of(mockTemplateList)
      );
      spyOn(
        anonymousConsentService,
        'getAnonymousConsentTemplates'
      ).and.returnValue(of(mockTemplateList));
      spyOn(anonymousConsentService, 'detectUpdatedTemplates').and.returnValue(
        false
      );

      const action = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();
      const completion1 = new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockTemplateList
      );
      const completion2 = new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
        false
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.loadAnonymousConsentTemplates$).toBeObservable(expected);
      expect(
        anonymousConsentService.detectUpdatedTemplates
      ).toHaveBeenCalledWith(mockTemplateList, mockTemplateList);
    });
  });

  const giveRequiredConsentsMethod = 'giveRequiredConsents';
  describe(`${giveRequiredConsentsMethod}`, () => {
    it('should giveAnonymousConsent', () => {
      spyOn(anonymousConsentService, 'giveAnonymousConsent').and.stub();

      effect[giveRequiredConsentsMethod](mockTemplateList);

      expect(anonymousConsentService.giveAnonymousConsent).toHaveBeenCalledWith(
        'xxx'
      );
    });
  });

  describe('transferAnonymousConsentsToUser$', () => {
    it('should not return TransferAnonymousConsent if RegisterUserSuccess was not dispatched', () => {
      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );

      actions$ = hot('-a', {
        a: loadUserTokenSuccessAction,
      });
      const expected = cold('----');

      expect(effect.transferAnonymousConsentsToUser$).toBeObservable(expected);
    });

    it('should return TransferAnonymousConsent', () => {
      spyOn(anonymousConsentService, 'getAnonymousConsent').and.returnValue(
        of(mockAnonymousConsent)
      );
      spyOn(
        anonymousConsentService,
        'getAnonymousConsentTemplate'
      ).and.returnValue(of(mockTemplateList[0]));
      spyOn(authService, 'getOccUserId').and.returnValue(of('current'));

      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );
      const registerSuccessAction = new UserActions.RegisterUserSuccess();

      const completion = new UserActions.TransferAnonymousConsent({
        userId: 'current',
        consentTemplateId: mockAnonymousConsent.templateCode,
        consentTemplateVersion: mockAnonymousConsent.version,
      });

      actions$ = hot('-(ab)', {
        a: registerSuccessAction,
        b: loadUserTokenSuccessAction,
      });
      const expected = cold('-c', { c: completion });

      expect(effect.transferAnonymousConsentsToUser$).toBeObservable(expected);
    });
  });
});
