import { Action } from '@ngrx/store';
import { AsmUi } from '../../models/asm.models';
import { AsmActions } from '../actions/index';

export const initialState: AsmUi = <AsmUi>{ collapsed: false };

export function reducer(state: AsmUi = initialState, action: Action): AsmUi {
  switch (action.type) {
    case AsmActions.ASM_UI_UPDATE: {
      return {
        ...state,
        ...(action as AsmActions.AsmUiUpdate).payload,
      };
    }
    default: {
      return state;
    }
  }
}
