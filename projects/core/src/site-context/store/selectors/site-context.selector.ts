import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { SiteContextState, SITE_CONTEXT_FEATURE } from '../state';

export const getSiteContextState: MemoizedSelector<
  any,
  SiteContextState
> = createFeatureSelector<SiteContextState>(SITE_CONTEXT_FEATURE);
