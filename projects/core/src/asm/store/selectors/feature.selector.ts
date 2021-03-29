import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AsmState, ASM_FEATURE, StateWithAsm } from '../asm-state';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export const getAsmState: MemoizedSelector<
  StateWithAsm,
  AsmState
> = createFeatureSelector<AsmState>(ASM_FEATURE);
