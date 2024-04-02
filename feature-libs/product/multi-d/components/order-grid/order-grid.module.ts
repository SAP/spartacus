import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OrderGridComponent } from './order-grid.component';

@NgModule({
  imports: [CommonModule],
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
