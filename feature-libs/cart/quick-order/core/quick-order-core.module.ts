import { ModuleWithProviders, NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { QuickOrderStatePersistenceService } from './services/quick-order-state-persistance.service';

@NgModule({
  providers: [...facadeProviders, QuickOrderStatePersistenceService],
})
export class QuickOrderCoreModule {
  static forRoot(): ModuleWithProviders<QuickOrderCoreModule> {
    return {
      ngModule: QuickOrderCoreModule,
    };
  }
}
