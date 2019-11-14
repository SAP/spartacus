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
import { UserConsentService } from '../../../user/facade/user-consent.service';
import { UserActions } from '../../../user/store/actions';
import { AnonymousConsentsConfig } from '../../config/anonymous-consents-config';
import { AnonymousConsentTemplatesConnector } from '../../connectors/index';
import { AnonymousConsentsService } from '../../facade/index';
import { AnonymousConsentsActions } from '../actions/index';
import * as fromEffect from './anonymous-consents.effect';

class MockUserContentService {
  getConsentsResultSuccess(): Observable<boolean> {
    return of(true);
  }

  getConsents(): Observable<ConsentTemplate[]> {
    return of();
  }

  loadConsents(): void {}
}

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
  getTemplates(): Observable<ConsentTemplate[]> {
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
  getConsents(): Observable<AnonymousConsent[]> {
    return of();
  }
  isConsentGiven(_consent: AnonymousConsent) {
    return true;
  }
  isConsentWithdrawn(_consent: AnonymousConsent): boolean {
    return false;
  }
  consentsUpdated(
    _newConsents: AnonymousConsent[],
    _previousConsents: AnonymousConsent[]
  ): boolean {
    return false;
  }
}

const mockTemplateList: ConsentTemplate[] = [
  {
    id: 'MARKETING',
    description: 'store user info consent template',
    version: 0,
  },
];

const mockAnonymousConsents: AnonymousConsent[] = [
  {
    templateCode: 'MARKETING',
    consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
    version: 0,
  },
  {
    templateCode: 'xxx',
    consentState: null,
    version: 0,
  },
];

const mockUserToken = {
  access_token: 'yyy',
} as UserToken;

const mockAnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
    requiredConsents: ['xxx', 'yyy'],
  },
  features: {
    anonymousConsents: true,
  },
};

const consentTemplateListMock: ConsentTemplate[] = [
  {
    id: 'xxx',
    version: 0,
    currentConsent: {
      consentGivenDate: new Date(),
      consentWithdrawnDate: new Date(),
    },
  },
  { id: 'yyy', version: 0 },
];

describe('AnonymousConsentsEffects', () => {
  let effect: fromEffect.AnonymousConsentsEffects;
  let connector: MockAnonymousConsentTemplatesConnector;
  let actions$: Observable<Action>;
  let authService: AuthService;
  let anonymousConsentService: AnonymousConsentsService;
  let userConsentService: UserConsentService;

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
        {
          provide: UserConsentService,
          useClass: MockUserContentService,
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
    userConsentService = TestBed.get(UserConsentService as Type<
      UserConsentService
    >);
  });

  describe('loadAnonymousConsentTemplates$', () => {
    it('should return LoadAnonymousConsentTemplatesSuccess and ToggleAnonymousConsentTemplatesUpdated', () => {
      spyOn(connector, 'loadAnonymousConsentTemplates').and.returnValue(
        of(mockTemplateList)
      );
      spyOn(anonymousConsentService, 'getTemplates').and.returnValue(
        of(mockTemplateList)
      );
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
      spyOn(anonymousConsentService, 'getConsents').and.returnValue(
        of(mockAnonymousConsents)
      );
      spyOn(anonymousConsentService, 'getTemplates').and.returnValue(
        of(mockTemplateList)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(authService, 'getOccUserId').and.returnValue(of('current'));

      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );
      const registerSuccessAction = new UserActions.RegisterUserSuccess();

      const completion = new UserActions.TransferAnonymousConsent({
        userId: 'current',
        consentTemplateId: mockAnonymousConsents[0].templateCode,
        consentTemplateVersion: mockAnonymousConsents[0].version,
      });

      actions$ = hot('-(ab)', {
        a: registerSuccessAction,
        b: loadUserTokenSuccessAction,
      });
      const expected = cold('-c', { c: completion });

      expect(effect.transferAnonymousConsentsToUser$).toBeObservable(expected);
    });
  });

  describe('giveRequiredConsentsToUser$', () => {
    it('should return GiveUserConsent for all required consents', () => {
      spyOn(userConsentService, 'getConsentsResultSuccess').and.returnValue(
        of(true)
      );
      spyOn(userConsentService, 'getConsents').and.returnValue(
        of(consentTemplateListMock)
      );

      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(authService, 'getOccUserId').and.returnValue(of('current'));

      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );

      const completion1 = new UserActions.GiveUserConsent({
        userId: 'current',
        consentTemplateId: consentTemplateListMock[0].id,
        consentTemplateVersion: consentTemplateListMock[0].version,
      });

      const completion2 = new UserActions.GiveUserConsent({
        userId: 'current',
        consentTemplateId: consentTemplateListMock[1].id,
        consentTemplateVersion: consentTemplateListMock[1].version,
      });

      actions$ = hot('-a', {
        a: loadUserTokenSuccessAction,
      });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.giveRequiredConsentsToUser$).toBeObservable(expected);
    });

    it('should get consents if they are not loaded', () => {
      spyOn(userConsentService, 'getConsentsResultSuccess').and.returnValue(
        of(false)
      );
      spyOn(userConsentService, 'getConsents').and.returnValue(
        of(consentTemplateListMock)
      );

      spyOn(userConsentService, 'loadConsents').and.stub();

      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(authService, 'getOccUserId').and.returnValue(of('current'));

      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );

      const completion1 = new UserActions.GiveUserConsent({
        userId: 'current',
        consentTemplateId: consentTemplateListMock[0].id,
        consentTemplateVersion: consentTemplateListMock[0].version,
      });

      const completion2 = new UserActions.GiveUserConsent({
        userId: 'current',
        consentTemplateId: consentTemplateListMock[1].id,
        consentTemplateVersion: consentTemplateListMock[1].version,
      });

      actions$ = hot('-a', {
        a: loadUserTokenSuccessAction,
      });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effect.giveRequiredConsentsToUser$).toBeObservable(expected);

      expect(userConsentService.loadConsents).toHaveBeenCalled();
    });

    it('should not dispatch if consent is given', () => {
      spyOn(userConsentService, 'getConsentsResultSuccess').and.returnValue(
        of(true)
      );
      spyOn(userConsentService, 'getConsents').and.returnValue(
        of([
          {
            id: 'xxx',
            version: 0,
            currentConsent: {
              consentGivenDate: new Date(),
            },
          },
        ])
      );

      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(authService, 'getOccUserId').and.returnValue(of('current'));

      const loadUserTokenSuccessAction = new AuthActions.LoadUserTokenSuccess(
        mockUserToken
      );

      actions$ = hot('-a', {
        a: loadUserTokenSuccessAction,
      });
      const expected = cold('');

      expect(effect.giveRequiredConsentsToUser$).toBeObservable(expected);
    });
  });
});
