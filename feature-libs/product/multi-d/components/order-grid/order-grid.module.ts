import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { OrderGridCounterComponent } from './order-grid-counter/order-grid-counter.component';
import { OrderGridComponent } from './order-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    ItemCounterModule,
  ],
  declarations: [OrderGridComponent, OrderGridCounterComponent],
  entryComponents: [OrderGridComponent, OrderGridCounterComponent],
  exports: [OrderGridComponent, OrderGridCounterComponent],
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
