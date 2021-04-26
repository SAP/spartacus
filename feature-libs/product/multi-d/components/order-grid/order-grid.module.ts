import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { OrderGridComponent } from './order-grid.component';

@NgModule({
  imports: [CommonModule, I18nModule, ItemCounterModule],
  declarations: [OrderGridComponent],
  entryComponents: [OrderGridComponent],
  exports: [OrderGridComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductOrderGridTabComponent: {
          component: OrderGridComponent,
        },
      },
    }),
  ],
})
export class OrderGridModule {}
