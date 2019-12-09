import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import {
  SITE_CONTEXT_FEATURE,
  SiteContextState,
  StateWithSiteContext,
} from '../state';

export const getSiteContextState: MemoizedSelector<
  StateWithSiteContext,
  SiteContextState
> = createFeatureSelector<SiteContextState>(SITE_CONTEXT_FEATURE);
