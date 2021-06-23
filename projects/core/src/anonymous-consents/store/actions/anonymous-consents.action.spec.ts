import {
  AnonymousConsent,
  ConsentTemplate,
} from '../../../model/consent.model';
import { StateUtils } from '../../../state/utils/index';
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
        const action =
          new AnonymousConsentsActions.LoadAnonymousConsentTemplates();
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES,
          meta: StateUtils.loadMeta(ANONYMOUS_CONSENTS),
        });
      });
    });
    describe('LoadAnonymousConsentTemplatesSuccess', () => {
      it('should create the action', () => {
        const action =
          new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
            mockConsentTemplates
          );
        expect({ ...action }).toEqual({
          payload: mockConsentTemplates,
          type: AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES_SUCCESS,
          meta: StateUtils.successMeta(ANONYMOUS_CONSENTS),
        });
      });
    });
    describe('LoadAnonymousConsentTemplatesFail', () => {
      it('should create the action', () => {
        const mockError = 'anError';
        const action =
          new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
            mockError
          );
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.LOAD_ANONYMOUS_CONSENT_TEMPLATES_FAIL,
          meta: StateUtils.failMeta(ANONYMOUS_CONSENTS, mockError),
        });
      });
    });
    describe('ResetLoadAnonymousConsentTemplates', () => {
      it('should create the action', () => {
        const action =
          new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates();
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.RESET_LOAD_ANONYMOUS_CONSENT_TEMPLATES,
          meta: StateUtils.resetMeta(ANONYMOUS_CONSENTS),
        });
      });
    });
    describe('ToggleAnonymousConsentsBannerDissmissed', () => {
      it('should create the action', () => {
        const dismissed = true;
        const action =
          new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
            dismissed
          );
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.TOGGLE_ANONYMOUS_CONSENTS_BANNER_DISMISSED,
          dismissed,
        });
      });
    });
    describe('ToggleAnonymousConsentTemplatesUpdated', () => {
      it('should create the action', () => {
        const updated = true;
        const action =
          new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
            updated
          );
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.TOGGLE_ANONYMOUS_CONSENT_TEMPLATES_UPDATED,
          updated,
        });
      });
    });
    describe('AnonymousConsentCheckUpdatedVersions', () => {
      it('should create the action', () => {
        const action =
          new AnonymousConsentsActions.AnonymousConsentCheckUpdatedVersions();
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.ANONYMOUS_CONSENT_CHECK_UPDATED_VERSIONS,
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
    describe('SetAnonymousConsents', () => {
      it('should create the action', () => {
        const mockAnonymousConsents: AnonymousConsent[] = [
          {
            consentState: undefined,
            templateCode: 'MARKETING',
            templateVersion: 0,
          },
        ];
        const action = new AnonymousConsentsActions.SetAnonymousConsents(
          mockAnonymousConsents
        );
        expect({ ...action }).toEqual({
          type: AnonymousConsentsActions.SET_ANONYMOUS_CONSENTS,
          payload: mockAnonymousConsents,
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
