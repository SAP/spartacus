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
      // if active base site is updated,
      // the active base site details data should also be updated
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
      // after base sites entities are populated,
      // the active base site details data is also populated
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
