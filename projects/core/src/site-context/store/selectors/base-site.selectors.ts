import { createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import {
  SiteContextState,
  StateWithSiteContext,
  BaseSitesState,
  BaseSiteEntities,
} from '../state';
import { getSiteContextState } from './site-context.selector';

const activeSiteSelector = (state: BaseSitesState) => state.activeSite;
const sitesEntitiesSelector = (state: BaseSitesState) => state.entities;

export const getBaseSitesState: MemoizedSelector<
  StateWithSiteContext,
  BaseSitesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.basesites
);

export const getBaseSitesEntities: MemoizedSelector<
  StateWithSiteContext,
  BaseSiteEntities
> = createSelector(getBaseSitesState, sitesEntitiesSelector);

export const getActiveBaseSite: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(getBaseSitesState, activeSiteSelector);

export const getAllBaseSites: MemoizedSelector<
  StateWithSiteContext,
  BaseSite[]
> = createSelector(getBaseSitesEntities, (entities) => {
  return entities ? Object.keys(entities).map((uid) => entities[uid]) : null;
});

export const getActiveBaseSiteData: MemoizedSelector<
  StateWithSiteContext,
  BaseSite
> = createSelector(getBaseSitesState, (state) => {
  return state.entities && state.activeSite
    ? state.entities[state.activeSite]
    : undefined;
});
