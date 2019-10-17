import { AnonymousConsentsActions } from '../actions/index';

export const initialState = true;

export function reducer(
  state = initialState,
  action: AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility
): boolean {
  switch (action.type) {
    case AnonymousConsentsActions.TOGGLE_ANONYMOUS_CONSENTS_BANNER_VISIBILITY: {
      return action.visible;
    }
  }

  return state;
}
