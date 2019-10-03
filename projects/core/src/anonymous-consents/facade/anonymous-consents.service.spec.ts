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

  it('loadAnonymousConsentTemplates should dispatch LoadAnonymousConsentTemplates action', () => {
    service.loadAnonymousConsentTemplates();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );
  });

  it('getAnonymousConsentTemplates should call getAnonymousConsentTemplatesValue selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result: ConsentTemplate[];
    service
      .getAnonymousConsentTemplates()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockConsentTemplates);
  });

  it('getAnonymousConsentTemplate should call getAnonymousConsentTemplate selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result: ConsentTemplate;
    service
      .getAnonymousConsentTemplate(mockTemplateCode)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockConsentTemplates[0]);
  });

  it('getLoadAnonymousConsentTemplatesLoading should call getAnonymousConsentTemplatesLoading selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );

    let result = false;
    service
      .getLoadAnonymousConsentTemplatesLoading()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('getLoadAnonymousConsentTemplatesSuccess should call getAnonymousConsentTemplatesSuccess selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    let result = false;
    service
      .getLoadAnonymousConsentTemplatesSuccess()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('getLoadAnonymousConsentTemplatesError should call getAnonymousConsentTemplatesError selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail('an error')
    );

    let result = false;
    service
      .getLoadAnonymousConsentTemplatesError()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('resetLoadAnonymousConsentTemplatesState should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.resetLoadAnonymousConsentTemplatesState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates()
    );
  });

  it('getAnonymousConsents should call getAnonymousConsents selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );

    let result: AnonymousConsent[];
    service
      .getAnonymousConsents()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents);
  });

  it('setAnonymousConsents should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.setAnonymousConsents(mockAnonymousConsents);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );
  });

  it('getAnonymousConsent should call getAnonymousConsentByTemplateCode selector', () => {
    store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );

    let result: AnonymousConsent;
    service
      .getAnonymousConsent(mockTemplateCode)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents[0]);
  });

  it('giveAnonymousConsent should dispatch GiveAnonymousConsent action', () => {
    service.giveAnonymousConsent(mockTemplateCode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.GiveAnonymousConsent(mockTemplateCode)
    );
  });

  it('giveAllAnonymousConsents should give anonymous consent for each consent template', () => {
    spyOn(service, 'getAnonymousConsentTemplates').and.returnValue(
      of(mockConsentTemplates)
    );
    spyOn(service, 'giveAnonymousConsent').and.stub();

    service
      .giveAllAnonymousConsents()
      .subscribe()
      .unsubscribe();

    expect(service.getAnonymousConsentTemplates).toHaveBeenCalled();
    expect(service.giveAnonymousConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  it('withdrawAnonymousConsent should dispatch WithdrawAnonymousConsent action', () => {
    service.withdrawAnonymousConsent(mockTemplateCode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(mockTemplateCode)
    );
  });

  it('withdrawAllAnonymousConsents should withdraw anonymous consent for each consent template', () => {
    spyOn(service, 'getAnonymousConsentTemplates').and.returnValue(
      of(mockConsentTemplates)
    );
    spyOn(service, 'withdrawAnonymousConsent').and.stub();

    service
      .withdrawAllAnonymousConsents()
      .subscribe()
      .unsubscribe();

    expect(service.getAnonymousConsentTemplates).toHaveBeenCalled();
    expect(service.withdrawAnonymousConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  it('toggleAnonymousConsentsBannerVisibility should dispatch ToggleAnonymousConsentsBannerVisibility action', () => {
    service.toggleAnonymousConsentsBannerVisibility(false);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility(
        false
      )
    );
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
});
