import { createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextState, StateWithSiteContext } from '../state';
import { getSiteContextState } from './site-context.selector';

export const getActiveBaseSite: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) =>
    state && state.baseSite && state.baseSite.activeSite
);

export const getBaseSiteData: MemoizedSelector<
  StateWithSiteContext,
  BaseSite
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state && state.baseSite && state.baseSite.details
);
