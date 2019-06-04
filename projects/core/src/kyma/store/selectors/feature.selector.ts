import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { KymaState, KYMA_FEATURE, StateWithKyma } from '../kyma-state';

export const getKymaState: MemoizedSelector<
  StateWithKyma,
  KymaState
> = createFeatureSelector<KymaState>(KYMA_FEATURE);
