import { ModuleWithProviders, NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';

/**
 * @deprecated since 3.2, use smartedit lib instead
 */
@NgModule({})
export class SmartEditModule {
  static forRoot(): ModuleWithProviders<SmartEditModule> {
    return {
      ngModule: SmartEditModule,
      providers: [...interceptors],
    };
  }
}
