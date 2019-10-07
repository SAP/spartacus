import { AsmUi } from '../../models/asm.models';
import { AsmActions } from '../actions/index';

export const initialState: AsmUi = <AsmUi>{ visible: false };

export function reducer(
  state = initialState,
  action: AsmActions.AsmUiAction
): AsmUi {
  switch (action.type) {
    case AsmActions.ASM_UI_UPDATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
