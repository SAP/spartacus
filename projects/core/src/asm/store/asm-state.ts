export const ASM_FEATURE = 'asm';

export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  cusrtomerSearchResult: any;
}
