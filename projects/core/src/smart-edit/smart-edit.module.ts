import { ModuleWithProviders, NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';
import { SMART_EDIT_MODULE_TOKEN } from './smart-edit.token';

/**
 * @deprecated since 3.2, use smartedit lib instead
 */
@NgModule({
  providers: [
    {
      provide: SMART_EDIT_MODULE_TOKEN,
      useValue: true,
    },
  ],
})
export class SmartEditModule {
  static forRoot(): ModuleWithProviders<SmartEditModule> {
    return {
      ngModule: SmartEditModule,
      providers: [...interceptors],
    };
  }
}
