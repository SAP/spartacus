import { ConsentTemplate, ConsentTemplateList } from '../../../occ';
import { PROCESS_FEATURE } from '../../../process';
import {
  entityFailMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
  failMeta,
  loadMeta,
  resetMeta,
  successMeta,
} from '../../../state';
import { GIVE_CONSENT_PROCESS_ID, USER_CONSENTS } from '../user-state';
import * as fromActions from './user-consents.action';

const userId = 'xxx@xxx.xxx';

describe('user consent actions', () => {
  describe('Load User Consents Actions', () => {
    describe('LoadUserConsents', () => {
      it('should create the action', () => {
        const action = new fromActions.LoadUserConsents(userId);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_USER_CONSENTS,
          payload: userId,
          meta: loadMeta(USER_CONSENTS),
        });
      });
    });
    describe('LoadUserConsentsFail', () => {
      it('should create the action', () => {
        const payload = 'anError';
        const action = new fromActions.LoadUserConsentsFail(payload);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_USER_CONSENTS_FAIL,
          payload,
          meta: failMeta(USER_CONSENTS, payload),
        });
      });
    });
    describe('LoadUserConsentsSuccess', () => {
      it('should create the action', () => {
        const payload: ConsentTemplateList = {
          consentTemplates: [{ id: 'xxx' }],
        };
        const action = new fromActions.LoadUserConsentsSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_USER_CONSENTS_SUCCESS,
          payload,
          meta: successMeta(USER_CONSENTS),
        });
      });
    });
    describe('ResetLoadUserConsents', () => {
      it('should create the action', () => {
        const action = new fromActions.ResetLoadUserConsents();
        expect({ ...action }).toEqual({
          type: fromActions.RESET_LOAD_USER_CONSENTS,
          meta: resetMeta(USER_CONSENTS),
        });
      });
    });
  });

  describe('Give User Consent Actions', () => {
    describe('GiveUserConsent', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          consentTemplateId: 'xxx',
          consentTemplateVersion: 0,
        };
        const action = new fromActions.GiveUserConsent(payload);
        expect({ ...action }).toEqual({
          type: fromActions.GIVE_USER_CONSENT,
          payload,
          meta: entityLoadMeta(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID),
        });
      });
    });
    describe('GiveUserConsentFail', () => {
      it('should create the action', () => {
        const payload = 'anError';
        const action = new fromActions.GiveUserConsentFail(payload);
        expect({ ...action }).toEqual({
          type: fromActions.GIVE_USER_CONSENT_FAIL,
          meta: entityFailMeta(
            PROCESS_FEATURE,
            GIVE_CONSENT_PROCESS_ID,
            payload
          ),
        });
      });
    });
    describe('GiveUserConsentSuccess', () => {
      it('should create the action', () => {
        const consentTemplate: ConsentTemplate = {
          id: 'xxx',
        };
        const action = new fromActions.GiveUserConsentSuccess(consentTemplate);
        expect({ ...action }).toEqual({
          type: fromActions.GIVE_USER_CONSENT_SUCCESS,
          payload: undefined,
          consentTemplate,
          meta: entitySuccessMeta(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID),
        });
      });
    });
    describe('ResetLoadUserConsents', () => {
      it('should create the action', () => {
        const action = new fromActions.ResetGiveUserConsentProcess();
        expect({ ...action }).toEqual({
          type: fromActions.RESET_GIVE_USER_CONSENT_PROCESS,
          meta: entityResetMeta(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID),
        });
      });
    });
  });
});
