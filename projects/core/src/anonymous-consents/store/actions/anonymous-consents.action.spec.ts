import { ConsentTemplate } from '../../../model/consent.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { ANONYMOUS_CONSENTS } from '../anonymous-consents-state';
import { AnonymousConsentsActions } from './index';

const mockTemplateId = 'MARKETING';
const mockConsentTemplates: ConsentTemplate[] = [
  {
    id: mockTemplateId,
    version: 0,
  },
  {
    id: 'STORE_USER_INFO',
    version: 0,
  },
];

describe('anonymous consent actions', () => {
  describe('load anonymous consent templates actions', () => {
    describe('LoadAnonymousConsentTemplates', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.LoadAnonymousConsentTemplates();
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES,
          meta: StateLoaderActions.loadMeta(ANONYMOUS_CONSENTS),
        });
      });
    });
    describe('LoadAnonymousConsentTemplatesSuccess', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
          mockConsentTemplates
        );
        expect({ ...action }).toEqual({
          payload: mockConsentTemplates,
          type:
            AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES_SUCCESS,
          meta: StateLoaderActions.successMeta(ANONYMOUS_CONSENTS),
        });
      });
    });
    describe('LoadAnonymousConsentTemplatesFail', () => {
      it('should create the action', () => {
        const mockError = 'anError';
        const action = new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
          mockError
        );
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES_FAIL,
          meta: StateLoaderActions.failMeta(ANONYMOUS_CONSENTS, mockError),
        });
      });
    });
    describe('ResetLoadAnonymousConsentTemplates', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates();
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.RESET_LOAD_ANONYMOUS_CONSENT_TEMPLATES,
          meta: StateLoaderActions.resetMeta(ANONYMOUS_CONSENTS),
        });
      });
    });
    describe('InitializeAnonymousConsents', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.InitializeAnonymousConsents(
          mockConsentTemplates
        );
        expect({ ...action }).toEqual({
          payload: mockConsentTemplates,
          type: AnonymousConsentsActions.INITIALIZE_ANONYMOUS_CONSENTS,
        });
      });
    });
  });

  describe('anonymous consents', () => {
    describe('GetAllAnonymousConsents', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.GetAllAnonymousConsents();
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.GET_ALL_ANONYMOUS_CONSENTS,
        });
      });
    });
    describe('GetAnonymousConsent', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.GetAnonymousConsent(
          mockTemplateId
        );
        expect({ ...action }).toEqual({
          templateCode: mockTemplateId,
          type: AnonymousConsentsActions.GET_ANONYMOUS_CONSENT,
        });
      });
    });
    describe('GiveAnonymousConsent', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.GiveAnonymousConsent(
          mockTemplateId
        );
        expect({ ...action }).toEqual({
          templateCode: mockTemplateId,
          type: AnonymousConsentsActions.GIVE_ANONYMOUS_CONSENT,
        });
      });
    });
    describe('WithdrawAnonymousConsent', () => {
      it('should create the action', () => {
        const action = new AnonymousConsentsActions.WithdrawAnonymousConsent(
          mockTemplateId
        );
        expect({ ...action }).toEqual({
          templateCode: mockTemplateId,
          type: AnonymousConsentsActions.WITHDRAW_ANONYMOUS_CONSENT,
        });
      });
    });
  });
});
