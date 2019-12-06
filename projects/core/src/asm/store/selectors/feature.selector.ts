import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { ASM_FEATURE, AsmState, StateWithAsm } from '../asm-state';

export const getAsmState: MemoizedSelector<
  StateWithAsm,
  AsmState
> = createFeatureSelector<AsmState>(ASM_FEATURE);
