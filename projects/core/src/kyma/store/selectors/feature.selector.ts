import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { KYMA_FEATURE, KymaState, StateWithKyma } from '../kyma-state';

export const getKymaState: MemoizedSelector<
  StateWithKyma,
  KymaState
> = createFeatureSelector<KymaState>(KYMA_FEATURE);
