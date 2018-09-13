import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { reducerToken, reducerProvider } from './store/reducers';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('errors', reducerToken)],
  providers: [
    reducerProvider,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class GlobalErrorHandlingModule {}
