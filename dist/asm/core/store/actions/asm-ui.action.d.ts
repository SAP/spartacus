import { Action } from '@ngrx/store';
import { AsmUi } from '@spartacus/asm/root';
export declare const ASM_UI_UPDATE = "[Asm] UI Update";
export declare class AsmUiUpdate implements Action {
    payload: AsmUi;
    readonly type = "[Asm] UI Update";
    constructor(payload: AsmUi);
}
export type AsmUiAction = AsmUiUpdate;
