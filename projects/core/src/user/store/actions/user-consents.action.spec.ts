import { ConsentTemplate } from '../../../model/consent.model';
import { PROCESS_FEATURE } from '../../../process/index';
import {
  StateEntityLoaderActions,
  StateLoaderActions,
} from '../../../state/utils/index';
import { GIVE_CONSENT_PROCESS_ID, USER_CONSENTS } from '../user-state';
import { UserActions } from './index';

const userId = 'xxx@xxx.xxx';

describe('user consent actions', () => {
  describe('Load User Consents Actions', () => {
    describe('LoadUserConsents', () => {
      it('should create the action', () => {
        const action = new UserActions.LoadUserConsents(userId);
        expect({ ...action }).toEqual({
          type: UserActions.LOAD_USER_CONSENTS,
          payload: userId,
          meta: StateLoaderActions.loadMeta(USER_CONSENTS),
        });
      });
    });
    describe('LoadUserConsentsFail', () => {
      it('should create the action', () => {
        const payload = 'anError';
        const action = new UserActions.LoadUserConsentsFail(payload);
        expect({ ...action }).toEqual({
          type: UserActions.LOAD_USER_CONSENTS_FAIL,
          payload,
          meta: StateLoaderActions.failMeta(USER_CONSENTS, payload),
        });
      });
    });
    describe('LoadUserConsentsSuccess', () => {
      it('should create the action', () => {
        const payload: ConsentTemplate[] = [{ id: 'xxx' }];
        const action = new UserActions.LoadUserConsentsSuccess(payload);
        expect({ ...action }).toEqual({
          type: UserActions.LOAD_USER_CONSENTS_SUCCESS,
          payload,
          meta: StateLoaderActions.successMeta(USER_CONSENTS),
        });
      });
    });
    describe('ResetLoadUserConsents', () => {
      it('should create the action', () => {
        const action = new UserActions.ResetLoadUserConsents();
        expect({ ...action }).toEqual({
          type: UserActions.RESET_LOAD_USER_CONSENTS,
          meta: StateLoaderActions.resetMeta(USER_CONSENTS),
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
        const action = new UserActions.GiveUserConsent(payload);
        expect({ ...action }).toEqual({
          type: UserActions.GIVE_USER_CONSENT,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            PROCESS_FEATURE,
            GIVE_CONSENT_PROCESS_ID
          ),
        });
      });
    });
    describe('GiveUserConsentFail', () => {
      it('should create the action', () => {
        const payload = 'anError';
        const action = new UserActions.GiveUserConsentFail(payload);
        expect({ ...action }).toEqual({
          type: UserActions.GIVE_USER_CONSENT_FAIL,
          meta: StateEntityLoaderActions.entityFailMeta(
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
        const action = new UserActions.GiveUserConsentSuccess(consentTemplate);
        expect({ ...action }).toEqual({
          type: UserActions.GIVE_USER_CONSENT_SUCCESS,
          payload: undefined,
          consentTemplate,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            PROCESS_FEATURE,
            GIVE_CONSENT_PROCESS_ID
          ),
        });
      });
    });
    describe('ResetLoadUserConsents', () => {
      it('should create the action', () => {
        const action = new UserActions.ResetGiveUserConsentProcess();
        expect({ ...action }).toEqual({
          type: UserActions.RESET_GIVE_USER_CONSENT_PROCESS,
          meta: StateEntityLoaderActions.entityResetMeta(
            PROCESS_FEATURE,
            GIVE_CONSENT_PROCESS_ID
          ),
        });
      });
    });
    describe('TransferAnonymousConsent', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          consentTemplateId: 'xxx',
          consentTemplateVersion: 0,
        };
        const action = new UserActions.TransferAnonymousConsent(payload);
        expect({ ...action }).toEqual({
          type: UserActions.TRANSFER_ANONYMOUS_CONSENT,
          payload,
        });
      });
    });
  });
});
