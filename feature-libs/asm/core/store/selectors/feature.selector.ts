import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AsmState, ASM_FEATURE, StateWithAsm } from '../asm-state';

export const getAsmState: MemoizedSelector<StateWithAsm, AsmState> =
  createFeatureSelector<AsmState>(ASM_FEATURE);
