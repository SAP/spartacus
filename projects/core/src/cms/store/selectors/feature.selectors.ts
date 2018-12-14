import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { CMS_FEATURE, CmsState, StateWithCms } from '../cms-state';

export const getCmsState: MemoizedSelector<
  StateWithCms,
  CmsState
> = createFeatureSelector<CmsState>(CMS_FEATURE);
