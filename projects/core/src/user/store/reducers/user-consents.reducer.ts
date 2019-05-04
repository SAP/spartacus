import { ConsentTemplateList } from 'projects/core/src/occ';
import * as fromActions from '../actions/user-consents.action';

export const initialState: ConsentTemplateList = {
  consentTemplates: [],
};

// TODO:#1184 - test

export function reducer(
  state = initialState,
  action: fromActions.UserConsentsAction
): ConsentTemplateList {
  switch (action.type) {
    case fromActions.LOAD_USER_CONSENTS_SUCCESS: {
      const consents = action.payload;
      return consents ? consents : initialState;
    }
    // TODO:#1184 - create a separate action that will reset the flags only?
    case fromActions.RESET_LOAD_USER_CONSENTS: {
      return state;
    }

    case fromActions.GIVE_USER_CONSENT_SUCCESS: {
      const updatedConsentTemplate = action.consentTemplate;
      const updatedTemplates = state.consentTemplates.map(consentTemplate =>
        consentTemplate.id === updatedConsentTemplate.id
          ? updatedConsentTemplate
          : consentTemplate
      );
      return {
        consentTemplates: updatedTemplates,
      };
    }
  }

  return state;
}
