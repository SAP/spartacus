import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
} from '@spartacus/core';

import { FutureStockTriggerComponent } from './future-stock-trigger.component';

@NgModule({
  imports: [
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        FutureStockComponent: {
          component: FutureStockTriggerComponent,
        },
      },
    }),
  ],
  declarations: [
    FutureStockTriggerComponent,
  ],
  exports: [
    FutureStockTriggerComponent,
  ],
})
export class FutureStockTriggerModule {}
