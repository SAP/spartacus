import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AsmUi } from '../../models/asm.models';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

/**
 * @deprecated since 3.0, use asm lib instead
 */
export const getAsmUi: MemoizedSelector<StateWithAsm, AsmUi> = createSelector(
  getAsmState,
  (state: AsmState) => state.asmUi
);
