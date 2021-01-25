import { Action } from '@ngrx/store';
import { AsmUi } from '../../models/asm.models';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export const ASM_UI_UPDATE = '[Asm] UI Update';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export class AsmUiUpdate implements Action {
  readonly type = ASM_UI_UPDATE;
  constructor(public payload: AsmUi) {}
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
// action types
export type AsmUiAction = AsmUiUpdate;
