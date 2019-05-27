import { ConsentTemplate } from '../../../occ/occ-models/additional-occ.models';
import * as fromActions from '../actions/user-consents.action';

export const initialState: ConsentTemplate[] = [];

export function reducer(
  state = initialState,
  action: fromActions.UserConsentsAction
): ConsentTemplate[] {
  switch (action.type) {
    case fromActions.LOAD_USER_CONSENTS_SUCCESS: {
      const consents = action.payload;
      return consents ? consents : initialState;
    }

    case fromActions.GIVE_USER_CONSENT_SUCCESS: {
      const updatedConsentTemplate = action.consentTemplate;
      return state.map(consentTemplate =>
        consentTemplate.id === updatedConsentTemplate.id
          ? updatedConsentTemplate
          : consentTemplate
      );
    }
  }

  return state;
}
