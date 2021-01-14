import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AsmUi } from '../../models/asm.models';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getAsmUi: MemoizedSelector<
  StateWithAsm,
  AsmUi | undefined
> = createSelector(getAsmState, (state: AsmState) => state.asmUi);
