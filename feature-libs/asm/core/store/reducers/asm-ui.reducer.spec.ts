import { AsmUi } from '../../models/asm.models';
import { AsmActions } from '../actions';
import * as fromReducer from './asm-ui.reducer';

const mockAsmUiUpdated: AsmUi = {
  collapsed: false,
};

describe('AsmUi reducer', () => {
  it('should return the same state for undefined action', () => {
    const { initialState } = fromReducer;
    const action = {} as AsmActions.AsmUiAction;
    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should return the initial state for undefined state', () => {
    const { initialState } = fromReducer;
    const action = {} as AsmActions.AsmUiAction;
    const state = fromReducer.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should update AsmUi', () => {
    const { initialState } = fromReducer;

    expect(initialState).not.toBe(mockAsmUiUpdated);
    const action = new AsmActions.AsmUiUpdate(mockAsmUiUpdated);
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(mockAsmUiUpdated);
  });
});
