import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import { BaseSiteState } from '../state';

export const initialState: BaseSiteState = {
  entities: null,
  details: {},
  activeSite: '',
};

export function reducer(
  state = initialState,
  action: SiteContextActions.BaseSiteAction
): BaseSiteState {
  switch (action.type) {
    case SiteContextActions.LOAD_BASE_SITE_SUCCESS: {
      return {
        ...state,
        details: action.payload,
      };
    }

    case SiteContextActions.SET_ACTIVE_BASE_SITE: {
      let details = {};
      if (state.entities) {
        details = state.entities[action.payload];
      }
      return {
        ...state,
        details,
        activeSite: action.payload,
      };
    }

    case SiteContextActions.LOAD_BASE_SITES_SUCCESS: {
      const sites: BaseSite[] = action.payload;
      const entities = sites.reduce(
        (siteEntities: { [uid: string]: BaseSite }, site: BaseSite) => {
          return {
            ...siteEntities,
            [site.uid]: site,
          };
        },
        {
          ...state.entities,
        }
      );
      const details = entities[state.activeSite];

      return {
        ...state,
        details,
        entities,
      };
    }
  }

  return state;
}
