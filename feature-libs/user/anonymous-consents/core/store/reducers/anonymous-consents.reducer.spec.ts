import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
} from '@spartacus/user/anonymous-consents/root';
import { AnonymousConsentsActions } from '../actions/index';
import * as fromReducer from './anonymous-consents.reducer';

const mockTemplateCode = 'MARKETING';

describe('anonymous consents reducer', () => {
  describe('toggleConsentStatus', () => {
    it('should give the consent', () => {
      const mockAnonymousConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
          templateCode: mockTemplateCode,
          templateVersion: 0,
        },
      ];

      const result = fromReducer.toggleConsentStatus(
        mockAnonymousConsents,
        mockTemplateCode,
        ANONYMOUS_CONSENT_STATUS.GIVEN
      );
      expect(result).toEqual([
        {
          ...mockAnonymousConsents[0],
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
        },
      ]);
    });

    it('should withdraw the consent', () => {
      const mockAnonymousConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: mockTemplateCode,
          templateVersion: 0,
        },
      ];

      const result = fromReducer.toggleConsentStatus(
        mockAnonymousConsents,
        mockTemplateCode,
        ANONYMOUS_CONSENT_STATUS.WITHDRAWN
      );
      expect(result).toEqual([
        {
          ...mockAnonymousConsents[0],
          consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
        },
      ]);
    });
  });

  describe('reducer', () => {
    const mockAnonymousConsents: AnonymousConsent[] = [
      {
        templateCode: mockTemplateCode,
        templateVersion: 0,
      },
    ];
    const mockState: AnonymousConsent[] = [
      {
        templateCode: mockTemplateCode,
        templateVersion: 0,
      },
    ];

    describe('undefined state', () => {
      it('should return the default state', () => {
        const { initialState } = fromReducer;
        const action = {} as AnonymousConsentsActions.LoadAnonymousConsentTemplates;
        const result = fromReducer.reducer(undefined, action);
        expect(result).toEqual(initialState);
      });
    });
    describe('GIVE_ANONYMOUS_CONSENT', () => {
      it('should toggle the consent to given', () => {
        const action = new AnonymousConsentsActions.GiveAnonymousConsent(
          mockTemplateCode
        );
        const result = fromReducer.reducer(mockState, action);

        const expected: AnonymousConsent[] = [
          {
            templateCode: mockTemplateCode,
            templateVersion: 0,
            consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          },
        ];
        expect(result).toEqual(expected);
      });
    });
    describe('WITHDRAW_ANONYMOUS_CONSENT', () => {
      it('should toggle the consent to withdrawn', () => {
        const action = new AnonymousConsentsActions.WithdrawAnonymousConsent(
          mockTemplateCode
        );
        const result = fromReducer.reducer(mockState, action);

        const expected: AnonymousConsent[] = [
          {
            templateCode: mockTemplateCode,
            templateVersion: 0,
            consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
          },
        ];
        expect(result).toEqual(expected);
      });
    });
    describe('SET_ANONYMOUS_CONSENTS', () => {
      it('should toggle the consent to withdrawn', () => {
        const action = new AnonymousConsentsActions.SetAnonymousConsents(
          mockAnonymousConsents
        );
        const result = fromReducer.reducer(mockState, action);
        expect(result).toEqual(mockAnonymousConsents);
      });
    });
  });
});
