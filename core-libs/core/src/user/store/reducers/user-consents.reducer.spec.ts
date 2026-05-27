import { ConsentTemplate } from '../../../model/consent.model';
import { UserActions } from '../actions/index';
import * as fromReducer from './user-consents.reducer';

const consentId = 'xxx';
const consents: ConsentTemplate[] = [{ id: consentId }];

describe('User Consents Reducer', () => {
  describe('undefined state', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.LoadUserConsentsSuccess;
      const result = fromReducer.reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });
  describe('LOAD_USER_CONSENTS_SUCCESS', () => {
    it('should return consents from the payload', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.LoadUserConsentsSuccess(consents);
      const result = fromReducer.reducer(initialState, action);
      expect(result).toEqual(consents);
    });
  });
  describe('GIVE_USER_CONSENT_SUCCESS', () => {
    it('should update the existing consents', () => {
      const consentGivenTemplate: ConsentTemplate = {
        id: consentId,
        description: 'updated description',
      };

      const action = new UserActions.GiveUserConsentSuccess(
        consentGivenTemplate
      );
      const result = fromReducer.reducer(consents, action);

      const expectedResult: ConsentTemplate[] = [consentGivenTemplate];
      expect(result).toEqual(expectedResult);
    });
  });
});
