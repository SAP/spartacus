import { MemoizedSelector } from '@ngrx/store';
import { AsmUi } from '@spartacus/asm/root';
import { StateWithAsm } from '../asm-state';
export declare const getAsmUi: MemoizedSelector<StateWithAsm, AsmUi>;
