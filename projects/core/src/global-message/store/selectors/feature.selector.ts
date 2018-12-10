import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import {
  GLOBAL_MESSAGE_FEATURE,
  GlobalMessageState,
  StateWithGlobalMessage
} from '../state';

export const getGlobalMessageState: MemoizedSelector<
  StateWithGlobalMessage,
  GlobalMessageState
> = createFeatureSelector<GlobalMessageState>(GLOBAL_MESSAGE_FEATURE);
