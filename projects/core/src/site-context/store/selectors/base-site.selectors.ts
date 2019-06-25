import { createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextState, StateWithSiteContext } from '../state';
import { SiteContextSelectors } from './index';

export const getActiveBaseSite: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  SiteContextSelectors.getSiteContextState,
  (state: SiteContextState) =>
    state && state.baseSite && state.baseSite.activeSite
);

export const getBaseSiteData: MemoizedSelector<
  StateWithSiteContext,
  BaseSite
> = createSelector(
  SiteContextSelectors.getSiteContextState,
  (state: SiteContextState) => state && state.baseSite && state.baseSite.details
);
