import { BaseSite } from 'projects/core/src/model';
import { SiteContextActions } from '../actions/index';
import { BaseSitesState } from '../state';

export const initialState: BaseSitesState = {
  entities: null,
  activeSite: null,
};

export function reducer(
  state = initialState,
  action: SiteContextActions.BaseSiteAction | SiteContextActions.BaseSitesAction
): BaseSitesState {
  switch (action.type) {
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

      return {
        ...state,
        entities,
      };
    }

    case SiteContextActions.SET_ACTIVE_BASE_SITE: {
      return {
        ...state,
        activeSite: action.payload,
      };
    }
  }

  return state;
}
