import { createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextState, StateWithSiteContext } from '../state';
import { getSiteContextState } from './site-context.selector';

/**
 * @deprecated since 3.0, it will not be used
 */
export const getActiveBaseSite: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) =>
    state && state.baseSite && state.baseSite.activeSite
);

/**
 * @deprecated since 3.0, it will not be used
 */
export const getBaseSiteData: MemoizedSelector<
  StateWithSiteContext,
  BaseSite
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state && state.baseSite && state.baseSite.details
);
