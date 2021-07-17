import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { Observable, of } from 'rxjs';
import {
  AnonymousConsentsActions,
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  StateWithAnonymousConsents,
} from '../store/index';
import * as fromStoreReducers from '../store/reducers/index';
import { AnonymousConsentsService } from './anonymous-consents.service';

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

const mockTemplateId = 'MARKETING';
const mockConsentTemplates: ConsentTemplate[] = [
  {
    id: mockTemplateId,
    description: 'marketing consent template',
    version: 0,
  },
  {
    id: 'STORE_USER_INFO',
    description: 'store user info consent template',
    version: 0,
  },
];

const mockAnonymousConsents: AnonymousConsent[] = [
  {
    templateCode: mockTemplateId,
    consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
    templateVersion: 0,
  },
  {
    templateCode: 'STORE_USER_INFO',
    consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
    templateVersion: 0,
  },
];

describe('AnonymousConsentsService', () => {
  let service: AnonymousConsentsService;
  let store: Store<StateWithAnonymousConsents>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ANONYMOUS_CONSENTS_STORE_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        AnonymousConsentsService,
      ],
    });

    service = TestBed.inject(AnonymousConsentsService);
    store = TestBed.inject(Store);
    authService = TestBed.inject(AuthService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadTemplates should dispatch LoadAnonymousConsentTemplates action', () => {
    service.loadTemplates();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );
  });

  describe('getTemplates', () => {
    describe('when load parameter is false', () => {
      it('should just call getAnonymousConsentTemplatesValue selector', () => {
        spyOn(service, 'loadTemplates').and.stub();
        store.dispatch(
          new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
            mockConsentTemplates
          )
        );

        let result: ConsentTemplate[] | undefined;
        service
          .getTemplates()
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(mockConsentTemplates);
        expect(service.loadTemplates).not.toHaveBeenCalled();
      });
    });
    describe('when load parameter is true', () => {
      it('should not attempt the load if already loading', () => {
        spyOn(service, 'loadTemplates').and.stub();
        spyOn(service, 'getLoadTemplatesLoading').and.returnValue(of(true));

        service.getTemplates(true).subscribe().unsubscribe();
        expect(service.loadTemplates).not.toHaveBeenCalled();
      });
      it('should attempt the load if NOT already loading and templates are undefined', () => {
        spyOn(service, 'loadTemplates').and.stub();
        spyOn(service, 'getLoadTemplatesLoading').and.returnValue(of(false));

        service.getTemplates(true).subscribe().unsubscribe();
        expect(service.loadTemplates).toHaveBeenCalled();
      });
      it('should NOT attempt the load if templates already exist', () => {
        spyOn(service, 'loadTemplates').and.stub();
        spyOn(service, 'getLoadTemplatesLoading').and.returnValue(of(false));
        store.dispatch(
          new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
            mockConsentTemplates
          )
        );

        service.getTemplates(true).subscribe().unsubscribe();
        expect(service.loadTemplates).not.toHaveBeenCalled();
      });
    });
  });

  it('getTemplate should call getAnonymousConsentTemplate selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result: ConsentTemplate | undefined;
    service
      .getTemplate(mockTemplateId)
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockConsentTemplates[0]);
  });

  it('getLoadTemplatesLoading should call getAnonymousConsentTemplatesLoading selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );

    let result = false;
    service
      .getLoadTemplatesLoading()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('getLoadTemplatesSuccess should call getAnonymousConsentTemplatesSuccess selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result = false;
    service
      .getLoadTemplatesSuccess()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('getLoadTemplatesError should call getAnonymousConsentTemplatesError selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail('an error')
    );

    let result = false;
    service
      .getLoadTemplatesError()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('resetLoadTemplatesState should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.resetLoadTemplatesState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates()
    );
  });

  it('getConsents should call getAnonymousConsents selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );

    let result: AnonymousConsent[] | undefined;
    service
      .getConsents()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents);
  });

  it('setConsents should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.setConsents(mockAnonymousConsents);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );
  });

  describe('getConsent', () => {
    describe('when the user is anonymous', () => {
      it('should call getAnonymousConsentByTemplateCode selector', () => {
        spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
        spyOn(service, 'getTemplates').and.returnValue(
          of(mockConsentTemplates)
        );
        store.dispatch(
          new AnonymousConsentsActions.SetAnonymousConsents(
            mockAnonymousConsents
          )
        );

        let result: AnonymousConsent | undefined;
        service
          .getConsent(mockTemplateId)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(mockAnonymousConsents[0]);
      });
    });
    describe('when the user is NOT anonymous', () => {
      it('should not call getTemplates()', () => {
        spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
        spyOn(service, 'getTemplates').and.stub();

        service.getConsent(mockTemplateId).subscribe().unsubscribe();

        expect(service.getTemplates).not.toHaveBeenCalled();
      });
    });
  });

  it('giveConsent should dispatch GiveAnonymousConsent action', () => {
    service.giveConsent(mockTemplateId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.GiveAnonymousConsent(mockTemplateId)
    );
  });

  it('giveAllConsents should give anonymous consent for each consent template', () => {
    spyOn(service, 'getTemplates').and.returnValue(of(mockConsentTemplates));
    spyOn(service, 'giveConsent').and.stub();

    service.giveAllConsents().subscribe().unsubscribe();

    expect(service.getTemplates).toHaveBeenCalled();
    expect(service.giveConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  describe('isConsentGiven', () => {
    it('should return true if the consent is given', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      };
      expect(service.isConsentGiven(anonymousConsent)).toEqual(true);
    });
    it('should return false if the consent is withdrawn', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
      };
      expect(service.isConsentGiven(anonymousConsent)).toEqual(false);
    });
  });

  it('withdrawAnonymousConsent should dispatch WithdrawAnonymousConsent action', () => {
    service.withdrawConsent(mockTemplateId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(mockTemplateId)
    );
  });

  it('withdrawAllConsents should withdraw anonymous consent for each consent template', () => {
    spyOn(service, 'getTemplates').and.returnValue(of(mockConsentTemplates));
    spyOn(service, 'withdrawConsent').and.stub();

    service.withdrawAllConsents().subscribe().unsubscribe();

    expect(service.getTemplates).toHaveBeenCalled();
    expect(service.withdrawConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  describe('isConsentWithdrawn', () => {
    it('should return true if the consent is withdrawn', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
      };
      expect(service.isConsentWithdrawn(anonymousConsent)).toEqual(true);
    });
    it('should return false if the consent is given', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      };
      expect(service.isConsentWithdrawn(anonymousConsent)).toEqual(false);
    });
  });

  describe('isBannerVisible', () => {
    it('should return true if isBannerDismissed() returns false', () => {
      spyOn(service, 'isBannerDismissed').and.returnValue(of(false));
      spyOn(service, 'getTemplatesUpdated').and.returnValue(of(false));

      let result = false;
      service
        .isBannerVisible()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(service.isBannerDismissed).toHaveBeenCalled();
      expect(service.getTemplatesUpdated).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
    it('should return true if getTemplatesUpdated() returns true', () => {
      spyOn(service, 'isBannerDismissed').and.returnValue(of(true));
      spyOn(service, 'getTemplatesUpdated').and.returnValue(of(true));

      let result = false;
      service
        .isBannerVisible()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(service.isBannerDismissed).toHaveBeenCalled();
      expect(service.getTemplatesUpdated).toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    it('should return false if isBannerDismissed() returns true and getTemplatesUpdated() returns false', () => {
      spyOn(service, 'isBannerDismissed').and.returnValue(of(true));
      spyOn(service, 'getTemplatesUpdated').and.returnValue(of(false));

      let result = true;
      service
        .isBannerVisible()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(service.isBannerDismissed).toHaveBeenCalled();
      expect(service.getTemplatesUpdated).toHaveBeenCalled();
      expect(result).toEqual(false);
    });
  });

  describe('toggleBannerDismissed', () => {
    it('should just dispatch ToggleAnonymousConsentsBannerDissmissed action when dismissing', () => {
      service.toggleBannerDismissed(false);
      expect(store.dispatch).toHaveBeenCalledWith(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
          false
        )
      );
    });
    it('should dispatch ToggleAnonymousConsentsBannerDissmissed action and call toggleTemplatesUpdated(false) when showing', () => {
      spyOn(service, 'toggleTemplatesUpdated').and.stub();
      service.toggleBannerDismissed(true);
      expect(store.dispatch).toHaveBeenCalledWith(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
          true
        )
      );
      expect(service.toggleTemplatesUpdated).toHaveBeenCalledWith(false);
    });
  });

  it('isBannerDismissed should call getAnonymousConsentsBannerDismissed selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
        false
      )
    );

    let result = true;
    service
      .isBannerDismissed()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
  });

  describe('getTemplatesUpdated', () => {
    it('should call getAnonymousConsentTemplatesUpdate selector and getTemplates(true)', () => {
      spyOn(service, 'getTemplates').and.returnValue(of([]));
      store.dispatch(
        new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
          false
        )
      );

      let result = true;
      service
        .getTemplatesUpdated()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
      expect(service.getTemplates).toHaveBeenCalledWith(true);
    });
  });

  it('toggleTemplatesUpdated should dispatch AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated', () => {
    service.toggleTemplatesUpdated(false);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(false)
    );
  });

  describe('detectUpdatedTemplates', () => {
    it('should return true when the lengths do not match', () => {
      expect(service.detectUpdatedTemplates(mockConsentTemplates, [])).toEqual(
        true
      );
    });
    it('should return true when a version was updated', () => {
      const updatedMockConsentTemplates: ConsentTemplate[] = [
        { ...mockConsentTemplates[0], version: 1 },
        mockConsentTemplates[1],
      ];
      expect(
        service.detectUpdatedTemplates(
          mockConsentTemplates,
          updatedMockConsentTemplates
        )
      ).toEqual(true);
    });
    it('should return false when the versions did not not update', () => {
      expect(
        service.detectUpdatedTemplates(
          mockConsentTemplates,
          mockConsentTemplates
        )
      ).toEqual(false);
    });
  });

  describe('serializeAndEncode', () => {
    it('should return an empty string if a falsy parameter is passed', () => {
      expect(service.serializeAndEncode(undefined)).toEqual('');
    });
    it('should return stringify and encode the provided consents', () => {
      const result = service.serializeAndEncode(mockAnonymousConsents);
      expect(result).toEqual(
        encodeURIComponent(JSON.stringify(mockAnonymousConsents))
      );
    });
  });

  describe('decodeAndDeserialize', () => {
    it('should decode and unserialize the provided value', () => {
      const mockRawConsents = encodeURIComponent(
        JSON.stringify(mockAnonymousConsents)
      );

      const result = service.decodeAndDeserialize(mockRawConsents);
      expect(result).toEqual(mockAnonymousConsents);
    });
  });

  describe('consentsUpdated', () => {
    it('should return true when the newConsents are different from previousConsents', () => {
      const newConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: 'a',
          templateVersion: 0,
        },
      ];
      const previousConsents: AnonymousConsent[] = [
        {
          consentState: undefined,
          templateCode: 'b',
          templateVersion: 1,
        },
      ];

      const result = service.consentsUpdated(newConsents, previousConsents);
      expect(result).toEqual(true);
    });
    it('should return false when the newConsents are the same as previousConsents', () => {
      const newConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: 'a',
          templateVersion: 0,
        },
      ];
      const previousConsents: AnonymousConsent[] = [...newConsents];

      const result = service.consentsUpdated(newConsents, previousConsents);
      expect(result).toEqual(false);
    });
  });
});
