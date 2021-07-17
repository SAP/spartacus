import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions, SiteContextActions, StateUtils } from '@spartacus/core';
import { ConsentTemplate } from '@spartacus/user/anonymous-consents/root';
import {
  AnonymousConsentsState,
  ANONYMOUS_CONSENTS,
} from '../anonymous-consents-state';
import * as fromAnonymousConsentsBanner from './anonymous-consents-banner.reducer';
import * as fromAnonymousConsentsUpdate from './anonymous-consents-update.reducer';
import * as fromAnonymousConsents from './anonymous-consents.reducer';

export function getReducers(): ActionReducerMap<AnonymousConsentsState, any> {
  return {
    templates: StateUtils.loaderReducer<ConsentTemplate[]>(ANONYMOUS_CONSENTS),
    consents: fromAnonymousConsents.reducer,
    ui: combineReducers({
      bannerDismissed: fromAnonymousConsentsBanner.reducer,
      updated: fromAnonymousConsentsUpdate.reducer,
    }),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AnonymousConsentsState>
> = new InjectionToken<ActionReducerMap<AnonymousConsentsState>>(
  'AnonymousConsentsReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearAnonymousConsentTemplates(
  reducer: ActionReducer<AnonymousConsentsState, Action>
): ActionReducer<AnonymousConsentsState, Action> {
  return function (state, action) {
    if (
      action.type === AuthActions.LOGOUT ||
      action.type === SiteContextActions.LANGUAGE_CHANGE
    ) {
      state = {
        ...state,
        templates: undefined,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [
  clearAnonymousConsentTemplates,
];
