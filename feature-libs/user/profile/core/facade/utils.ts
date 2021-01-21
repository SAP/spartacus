import { select, Store } from '@ngrx/store';
import { ProcessSelectors } from '@spartacus/core';
import { Observable } from 'rxjs';

export function getLoadState(processId: string) {
  return this.store.pipe(
    select(ProcessSelectors.getProcessLoadingFactory(processId))
  );
}

export function getErrorState(processId: string) {
  return this.store.pipe(
    select(ProcessSelectors.getProcessErrorFactory(processId))
  );
}

export function getSuccessState(processId: string) {
  return this.store.pipe(
    select(ProcessSelectors.getProcessSuccessFactory(processId))
  );
}

export function getCallState(store: Store<any>, processId: string, clear?) {
  return {
    isLoading() {
      return store.pipe(
        select(ProcessSelectors.getProcessLoadingFactory(processId))
      );
    },
    hasError() {
      return store.pipe(
        select(ProcessSelectors.getProcessErrorFactory(processId))
      );
    },
    isSuccessful() {
      return store.pipe(
        select(ProcessSelectors.getProcessSuccessFactory(processId))
      );
    },
    clear() {
      clear();
    },
  };
}

export interface ResultStateControl {
  /**
   * Returns the observed loading state.
   */
  isLoading(): Observable<boolean>;

  /**
   * Returns the observed success state.
   */
  hasSuccess(): Observable<boolean>;

  /**
   * Returns the observed error state.
   */
  hasError(): Observable<boolean>;

  /**
   * Clears the result state.
   */
  clearResultState(): void;
}
