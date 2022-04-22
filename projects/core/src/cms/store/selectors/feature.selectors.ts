import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { CmsState, CMS_FEATURE, StateWithCms } from '../cms-state';

export const getCmsState: MemoizedSelector<StateWithCms, CmsState> =
  createFeatureSelector<CmsState>(CMS_FEATURE);
