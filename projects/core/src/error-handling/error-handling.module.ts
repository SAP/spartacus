import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';

@NgModule()
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
      ],
    };
  }
}
