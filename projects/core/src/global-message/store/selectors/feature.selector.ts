import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  GlobalMessageState,
  GLOBAL_MESSAGE_FEATURE,
  StateWithGlobalMessage,
} from '../global-message-state';

export const getGlobalMessageState: MemoizedSelector<
  StateWithGlobalMessage,
  GlobalMessageState
> = createFeatureSelector<GlobalMessageState>(GLOBAL_MESSAGE_FEATURE);
