import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../../model/consent.model';
import { AnonymousConsentsActions } from '../actions/index';
import * as fromReducer from './anonymous-consents.reducer';

const mockTemplateCode = 'MARKETING';

describe('anonymous consents reducer', () => {
  describe('toggleConsentStatus', () => {
    it('should give the consent', () => {
      const mockAnonymousConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
          templateCode: mockTemplateCode,
          version: 0,
        },
      ];

      const result = fromReducer.toggleConsentStatus(
        mockAnonymousConsents,
        mockTemplateCode,
        ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN
      );
      expect(result).toEqual([
        {
          ...mockAnonymousConsents[0],
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
        },
      ]);
    });

    it('should withdraw the consent', () => {
      const mockAnonymousConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
          templateCode: mockTemplateCode,
          version: 0,
        },
      ];

      const result = fromReducer.toggleConsentStatus(
        mockAnonymousConsents,
        mockTemplateCode,
        ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN
      );
      expect(result).toEqual([
        {
          ...mockAnonymousConsents[0],
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
        },
      ]);
    });
  });

  describe('reducer', () => {
    const mockAnonymousConsents: ConsentTemplate[] = [
      {
        id: mockTemplateCode,
        version: 0,
      },
    ];
    const mockState: AnonymousConsent[] = [
      {
        templateCode: mockTemplateCode,
        version: 0,
      },
    ];

    describe('undefined state', () => {
      it('should return the default state', () => {
        const { initialState } = fromReducer;
        const action = {} as AnonymousConsentsActions.InitializeAnonymousConsents;
        const result = fromReducer.reducer(undefined, action);
        expect(result).toEqual(initialState);
      });
    });
    describe('INITIALIZE_ANONYMOUS_CONSENTS', () => {
      it('should create anonymous consents for each of the provided templates', () => {
        const action = new AnonymousConsentsActions.InitializeAnonymousConsents(
          mockAnonymousConsents
        );
        const result = fromReducer.reducer(undefined, action);

        const expected: AnonymousConsent[] = [
          {
            templateCode: mockTemplateCode,
            version: 0,
            consentState: undefined,
          },
        ];
        expect(result).toEqual(expected);
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
            version: 0,
            consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
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
            version: 0,
            consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
          },
        ];
        expect(result).toEqual(expected);
      });
    });
  });
});
