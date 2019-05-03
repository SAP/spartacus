import { ConsentTemplateList } from 'projects/core/src/occ';
import * as fromActions from '../actions/user-consents.action';

export const initialState: ConsentTemplateList = {
  consentTemplates: [],
};

export function reducer(
  state = initialState,
  action: fromActions.UserConsentsAction
): ConsentTemplateList {
  switch (action.type) {
    case fromActions.LOAD_USER_CONSENTS_SUCCESS: {
      const consents = action.payload;
      state = {
        ...state,
        ...consents.consentTemplates,
      };
      return consents ? consents : initialState;
    }
    case fromActions.LOAD_USER_CONSENTS_FAIL: {
      return initialState;
    }
    // TODO:#1184 - create a separate action that will reset the flags only?
    case fromActions.RESET_LOAD_USER_CONSENTS: {
      return state;
    }
  }

  return state;
}
