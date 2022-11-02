import { ModuleWithProviders, NgModule } from '@angular/core';
import { UnitOrderDetailsOrderEntriesContext } from '../components/page-context/unit-order-details-order-entries.context';
import { UnitOrderDetailsOrderEntriesContextToken } from '../root/context';
import { UnitOrderFacade } from '../root/facade';
import { UnitOrderConnector } from './connectors';
import { UnitOrderService } from './services';
import { UnitOrderStoreModule } from './store/unit-order-store.module';

@NgModule({
  imports: [UnitOrderStoreModule],
})
export class UnitOrderCoreModule {
  static forRoot(): ModuleWithProviders<UnitOrderCoreModule> {
    return {
      ngModule: UnitOrderCoreModule,
      providers: [
        {
          provide: UnitOrderFacade,
          useExisting: UnitOrderService,
        },
        UnitOrderConnector,
        {
          provide: UnitOrderDetailsOrderEntriesContextToken,
          useExisting: UnitOrderDetailsOrderEntriesContext,
        },
      ],
    };
  }
}
