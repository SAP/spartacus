import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../model/index';
import {
  AnonymousConsentsActions,
  AnonymousConsentsSelectors,
  AnonymousConsentsState,
  ANONYMOUS_CONSENTS_FEATURE,
  StateWithAnonymousConsents,
} from '../store/index';
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
  let mockStore: Store<StateWithAnonymousConsents>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore<StateWithAnonymousConsents>({
          initialState: {
            [ANONYMOUS_CONSENTS_FEATURE]: {} as AnonymousConsentsState,
          },
          selectors: [
            {
              selector:
                AnonymousConsentsSelectors.getAnonymousConsentTemplatesValue,
              value: mockConsentTemplates,
            },
            {
              selector: AnonymousConsentsSelectors.getAnonymousConsentTemplate(
                mockTemplateCode
              ),
              value: mockConsentTemplates[0],
            },
            {
              selector:
                AnonymousConsentsSelectors.getAnonymousConsentTemplatesLoading,
              value: true,
            },
            {
              selector:
                AnonymousConsentsSelectors.getAnonymousConsentTemplatesSuccess,
              value: true,
            },
            {
              selector:
                AnonymousConsentsSelectors.getAnonymousConsentTemplatesError,
              value: true,
            },
            {
              selector: AnonymousConsentsSelectors.getAnonymousConsents,
              value: mockAnonymousConsents,
            },
            {
              selector: AnonymousConsentsSelectors.getAnonymousConsentByTemplateCode(
                mockTemplateCode
              ),
              value: mockAnonymousConsents[0],
            },
          ],
        }),
      ],
    });

    service = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);
    mockStore = TestBed.get(Store);
    spyOn(mockStore, 'dispatch').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadAnonymousConsentTemplates should dispatch LoadAnonymousConsentTemplates action', () => {
    service.loadAnonymousConsentTemplates();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );
  });

  it('getAnonymousConsentTemplates should call getAnonymousConsentTemplatesValue selector', () => {
    let result: ConsentTemplate[];
    service
      .getAnonymousConsentTemplates()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockConsentTemplates);
  });

  it('getAnonymousConsentTemplate should call getAnonymousConsentTemplate selector', () => {
    let result: ConsentTemplate;
    service
      .getAnonymousConsentTemplate(mockTemplateCode)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockConsentTemplates[0]);
  });

  it('getLoadAnonymousConsentTemplatesLoading should call getAnonymousConsentTemplatesLoading selector', () => {
    let result = false;
    service
      .getLoadAnonymousConsentTemplatesLoading()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('getLoadAnonymousConsentTemplatesSuccess should call getAnonymousConsentTemplatesSuccess selector', () => {
    let result = false;
    service
      .getLoadAnonymousConsentTemplatesSuccess()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('getLoadAnonymousConsentTemplatesError should call getAnonymousConsentTemplatesError selector', () => {
    let result = false;
    service
      .getLoadAnonymousConsentTemplatesError()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });

  it('resetLoadAnonymousConsentTemplatesState should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.resetLoadAnonymousConsentTemplatesState();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates()
    );
  });

  it('getAnonymousConsents should call getAnonymousConsents selector', () => {
    let result: AnonymousConsent[];
    service
      .getAnonymousConsents()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents);
  });

  it('getAnonymousConsent should call getAnonymousConsentByTemplateCode selector', () => {
    let result: AnonymousConsent;
    service
      .getAnonymousConsent(mockTemplateCode)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockAnonymousConsents[0]);
  });

  it('giveAnonymousConsent should dispatch GiveAnonymousConsent action', () => {
    service.giveAnonymousConsent(mockTemplateCode);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.GiveAnonymousConsent(mockTemplateCode)
    );
  });

  it('withdrawAnonymousConsent should dispatch WithdrawAnonymousConsent action', () => {
    service.withdrawAnonymousConsent(mockTemplateCode);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(mockTemplateCode)
    );
  });
});
