import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithSiteContext, SiteContextState } from '../state';
import { getSiteContextState } from './site-context.selector';
import { BaseSite } from '../../../model/misc.model';

export const getActiveBaseSite: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.baseSite.activeSite
);

export const getBaseSiteData: MemoizedSelector<
  StateWithSiteContext,
  BaseSite
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.baseSite.details
);
