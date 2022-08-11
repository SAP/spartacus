import { AnonymousConsentsActions } from '../actions/index';

export const initialState = false;

export function reducer(
  state = initialState,
  action: AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated
): boolean {
  switch (action.type) {
    case AnonymousConsentsActions.TOGGLE_ANONYMOUS_CONSENT_TEMPLATES_UPDATED: {
      return action.updated;
    }
  }

  return state;
}
