import { Action } from '@ngrx/store';
import { AsmUi } from '../../models/asm.models';

export const ASM_UI_UPDATE = '[Asm] UI Update';

export class AsmUiUpdate implements Action {
  readonly type = ASM_UI_UPDATE;
  constructor(public payload: AsmUi) {}
}
// action types
export type AsmUiAction = AsmUiUpdate;
