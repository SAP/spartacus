import { ConsentTemplate } from '../../../model/consent.model';
import { UserActions } from '../actions/index';

export const initialState: ConsentTemplate[] = [];

export function reducer(
  state = initialState,
  action: UserActions.UserConsentsAction
): ConsentTemplate[] {
  switch (action.type) {
    case UserActions.LOAD_USER_CONSENTS_SUCCESS: {
      const consents = action.payload;
      return consents ? consents : initialState;
    }

    case UserActions.GIVE_USER_CONSENT_SUCCESS: {
      const updatedConsentTemplate = action.consentTemplate;
      return state.map((consentTemplate) =>
        consentTemplate.id === updatedConsentTemplate.id
          ? updatedConsentTemplate
          : consentTemplate
      );
    }
  }

  return state;
}
