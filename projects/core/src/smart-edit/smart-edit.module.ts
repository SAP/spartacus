import { ModuleWithProviders, NgModule } from '@angular/core';
import { smartEditDecorators } from './decorators';
import { interceptors } from './http-interceptors/index';

@NgModule({})
export class SmartEditModule {
  static forRoot(): ModuleWithProviders<SmartEditModule> {
    return {
      ngModule: SmartEditModule,
      providers: [...smartEditDecorators, ...interceptors],
    };
  }
}
