export const ASM_FEATURE = 'asm';

export interface StateWithAuth {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  cusrtomerSearchResult: any;
}
