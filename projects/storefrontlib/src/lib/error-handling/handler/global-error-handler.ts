import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const store = this.injector.get<Store<fromStore.GlobalErrorHandlingAction>>(
      Store
    );
    store.dispatch(new fromStore.GlobalErrorHandlingAction(error));

    console.error(`Caught an error in global message handler: `, error);
  }
}
