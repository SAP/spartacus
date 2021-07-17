import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  AuthActions,
  AuthService,
  UserActions,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  Consent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AnonymousConsentsConfig } from '../../config/anonymous-consents-config';
import { UserAnonymousConsentTemplatesConnector } from '../../connectors/index';
import { AnonymousConsentsService } from '../../facade/index';
import { AnonymousConsentsActions } from '../actions/index';
import * as fromEffect from './anonymous-consents.effect';

const getTemplatesBehavior = new BehaviorSubject<ConsentTemplate[]>([]);
const getConsentsBehavior = new BehaviorSubject<AnonymousConsent[]>([]);
const loadAnonymousConsentsBehavior = new BehaviorSubject<AnonymousConsent[]>(
  []
);

class MockUserConsentService implements Partial<UserConsentService> {
  getConsentsResultSuccess(): Observable<boolean> {
    return of(true);
  }
  getConsents(): Observable<ConsentTemplate[]> {
    return of();
  }
  loadConsents(): void {}
  isConsentWithdrawn(_consent: Consent): boolean {
    return false;
  }
}

class MockUserAnonymousConsentTemplatesConnector
  implements Partial<UserAnonymousConsentTemplatesConnector> {
  loadAnonymousConsents = () => loadAnonymousConsentsBehavior;
  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of();
  }
}

class MockAnonymousConsentsService {
  getTemplates = () => getTemplatesBehavior;
  getConsents = () => getConsentsBehavior;
  detectUpdatedVersion(
    _currentVersions: number[],
    _newVersions: number[]
  ): boolean {
    return false;
  }
  detectUpdatedTemplates(
    _currentTemplates: ConsentTemplate[],
    _newTemplates: ConsentTemplate[]
  ): boolean {
    return false;
  }
  getAnonymousConsent(_templateCode: string): Observable<AnonymousConsent> {
    return of();
  }
  getAnonymousConsentTemplate(
    _templateCode: string
  ): Observable<ConsentTemplate> {
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
    templateVersion: 0,
  },
  {
    templateCode: 'xxx',
    consentState: undefined,
    templateVersion: 0,
  },
];

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
  let connector: UserAnonymousConsentTemplatesConnector;
  let actions$: Observable<Action>;
  let authService: AuthService;
  let userIdService: UserIdService;
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
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        {
          provide: UserAnonymousConsentTemplatesConnector,
          useClass: MockUserAnonymousConsentTemplatesConnector,
        },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: UserConsentService,
          useClass: MockUserConsentService,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(fromEffect.AnonymousConsentsEffects);
    connector = TestBed.inject(UserAnonymousConsentTemplatesConnector);
    anonymousConsentService = TestBed.inject(AnonymousConsentsService);
    authService = TestBed.inject(AuthService);
    userConsentService = TestBed.inject(UserConsentService);
    userIdService = TestBed.inject(UserIdService);
  });

  describe('checkConsentVersions$', () => {
    const currentConsents: AnonymousConsent[] = [
      { templateVersion: 0, templateCode: 'test1' },
    ];
    describe('when the update was detected', () => {
      it('should return LoadAnonymousConsentTemplates', () => {
        getConsentsBehavior.next(currentConsents);
        loadAnonymousConsentsBehavior.next([]);

        const action = new AnonymousConsentsActions.AnonymousConsentCheckUpdatedVersions();

        actions$ = hot('-a', { a: action });
        const completion = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();
        const expected = cold('-b', { b: completion });

        expect(effect.checkConsentVersions$).toBeObservable(expected);
      });
    });
    describe('when the update was NOT detected', () => {
      it('should return an EMPTY', () => {
        getConsentsBehavior.next(currentConsents);
        loadAnonymousConsentsBehavior.next(currentConsents);

        const action = new AnonymousConsentsActions.AnonymousConsentCheckUpdatedVersions();

        actions$ = hot('-a', { a: action });
        const expected = cold('---');

        expect(effect.checkConsentVersions$).toBeObservable(expected);
      });
    });
  });

  describe('loadAnonymousConsentTemplates$', () => {
    it('should return LoadAnonymousConsentTemplatesSuccess and ToggleAnonymousConsentTemplatesUpdated', () => {
      getTemplatesBehavior.next(mockTemplateList);
      spyOn(connector, 'loadAnonymousConsentTemplates').and.returnValue(
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
      const loginAction = new AuthActions.Login();

      actions$ = hot('-a', {
        a: loginAction,
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
      spyOn(userIdService, 'getUserId').and.returnValue(of('current'));

      const loginAction = new AuthActions.Login();
      const registerSuccessAction = new UserActions.RegisterUserSuccess();

      const completion = new UserActions.TransferAnonymousConsent({
        userId: 'current',
        consentTemplateId: mockAnonymousConsents[0].templateCode,
        consentTemplateVersion: mockAnonymousConsents[0].templateVersion,
      });

      actions$ = hot('-(ab)', {
        a: registerSuccessAction,
        b: loginAction,
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
      spyOn(userConsentService, 'isConsentWithdrawn').and.returnValue(true);

      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(userIdService, 'getUserId').and.returnValue(of('current'));

      const loginAction = new AuthActions.Login();

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
        a: loginAction,
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
      spyOn(userConsentService, 'isConsentWithdrawn').and.returnValue(true);

      spyOn(userConsentService, 'loadConsents').and.stub();

      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
      spyOn(userIdService, 'getUserId').and.returnValue(of('current'));

      const loginAction = new AuthActions.Login();

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
        a: loginAction,
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
      spyOn(userIdService, 'getUserId').and.returnValue(of('current'));

      const loginAction = new AuthActions.Login();

      actions$ = hot('-a', {
        a: loginAction,
      });
      const expected = cold('');

      expect(effect.giveRequiredConsentsToUser$).toBeObservable(expected);
    });
  });
});
