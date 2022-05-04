import { ModuleWithProviders, NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders],
})
export class FutureStockCoreModule {
  static forRoot(): ModuleWithProviders<FutureStockCoreModule> {
    return {
      ngModule: FutureStockCoreModule,
    };
  }
}
