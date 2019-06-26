import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  SiteContextState,
  SITE_CONTEXT_FEATURE,
  StateWithSiteContext,
} from '../state';

export const getSiteContextState: MemoizedSelector<
  StateWithSiteContext,
  SiteContextState
> = createFeatureSelector<SiteContextState>(SITE_CONTEXT_FEATURE);
