import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithSiteContext, SiteContextState } from '../state';
import { getSiteContextState } from './site-context.selector';

export const getActiveBaseSite: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.baseSite
);
