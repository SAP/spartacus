import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../model/index';
import {
  AnonymousConsentsActions,
  ANONYMOUS_CONSENTS_FEATURE,
  StateWithAnonymousConsents,
} from '../store/index';
import * as fromStoreReducers from '../store/reducers/index';
import { AnonymousConsentsService } from './anonymous-consents.service';

const mockTemplateCode = 'MARKETING';
const mockConsentTemplates: ConsentTemplate[] = [
  {
    id: mockTemplateCode,
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
    templateCode: mockTemplateCode,
    consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
    version: 0,
  },
  {
    templateCode: 'STORE_USER_INFO',
    consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
    version: 0,
  },
];

describe('AnonymousConsentsService', () => {
  let service: AnonymousConsentsService;
  let store: Store<StateWithAnonymousConsents>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ANONYMOUS_CONSENTS_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
    });

    service = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);
    store = TestBed.get(Store as Type<Store<StateWithAnonymousConsents>>);
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

  it('getTemplates should call getAnonymousConsentTemplatesValue selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result: ConsentTemplate[];
    service
      .getTemplates()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockConsentTemplates);
  });

  it('getTemplate should call getAnonymousConsentTemplate selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result: ConsentTemplate;
    service
      .getTemplate(mockTemplateCode)
      .subscribe(value => (result = value))
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
      .subscribe(value => (result = value))
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
      .subscribe(value => (result = value))
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
      .subscribe(value => (result = value))
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

    let result: AnonymousConsent[];
    service
      .getConsents()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents);
  });

  it('setConsents should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.setConsents(mockAnonymousConsents);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );
  });

  it('getConsent should call getAnonymousConsentByTemplateCode selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );

    let result: AnonymousConsent;
    service
      .getConsent(mockTemplateCode)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents[0]);
  });

  it('giveConsent should dispatch GiveAnonymousConsent action', () => {
    service.giveConsent(mockTemplateCode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.GiveAnonymousConsent(mockTemplateCode)
    );
  });

  it('giveAllConsents should give anonymous consent for each consent template', () => {
    spyOn(service, 'getTemplates').and.returnValue(of(mockConsentTemplates));
    spyOn(service, 'giveConsent').and.stub();

    service
      .giveAllConsents()
      .subscribe()
      .unsubscribe();

    expect(service.getTemplates).toHaveBeenCalled();
    expect(service.giveConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  describe('isConsentGiven', () => {
    it('should return true if the consent is given', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
      };
      expect(service.isConsentGiven(anonymousConsent)).toEqual(true);
    });
    it('should return false if the consent is withdrawn', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
      };
      expect(service.isConsentGiven(anonymousConsent)).toEqual(false);
    });
  });

  it('withdrawAnonymousConsent should dispatch WithdrawAnonymousConsent action', () => {
    service.withdrawConsent(mockTemplateCode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(mockTemplateCode)
    );
  });

  it('withdrawAllConsents should withdraw anonymous consent for each consent template', () => {
    spyOn(service, 'getTemplates').and.returnValue(of(mockConsentTemplates));
    spyOn(service, 'withdrawConsent').and.stub();

    service
      .withdrawAllConsents()
      .subscribe()
      .unsubscribe();

    expect(service.getTemplates).toHaveBeenCalled();
    expect(service.withdrawConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  describe('isConsentWithdrawn', () => {
    it('should return true if the consent is withdrawn', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
      };
      expect(service.isConsentWithdrawn(anonymousConsent)).toEqual(true);
    });
    it('should return false if the consent is given', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
      };
      expect(service.isConsentWithdrawn(anonymousConsent)).toEqual(false);
    });
  });

  describe('toggleAnonymousConsentsBannerVisibility', () => {
    it('should just dispatch ToggleAnonymousConsentsBannerVisibility action when toggling off', () => {
      service.toggleAnonymousConsentsBannerVisibility(false);
      expect(store.dispatch).toHaveBeenCalledWith(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility(
          false
        )
      );
    });
    it('should dispatch ToggleAnonymousConsentsBannerVisibility action and call toggleTemplatesUpdated(false) when toggling on', () => {
      spyOn(service, 'toggleTemplatesUpdated').and.stub();
      service.toggleAnonymousConsentsBannerVisibility(false);
      expect(store.dispatch).toHaveBeenCalledWith(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility(
          false
        )
      );
      expect(service.toggleTemplatesUpdated).toHaveBeenCalledWith(false);
    });
  });

  it('isAnonymousConsentsBannerVisible should call getAnonymousConsentsBannerVisibility selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility(
        false
      )
    );

    let result = true;
    service
      .isAnonymousConsentsBannerVisible()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
  });

  it('getTemplatesUpdated should call getAnonymousConsentTemplatesUpdate selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(false)
    );

    let result = true;
    service
      .getTemplatesUpdated()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
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
});
