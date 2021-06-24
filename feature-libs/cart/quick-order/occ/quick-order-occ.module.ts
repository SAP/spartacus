import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { QuickOrderAdapter } from '../core/connectors/quick-order.adapter';
import { OccQuickOrderAdapter } from './adapters/occ-quick-order.adapter';
import { defaultOccQuickOrderConfig } from './config/default-occ-quick-order-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccQuickOrderConfig),
    {
      provide: QuickOrderAdapter,
      useClass: OccQuickOrderAdapter,
    },
  ],
})
export class QuickOrderOccModule {}
