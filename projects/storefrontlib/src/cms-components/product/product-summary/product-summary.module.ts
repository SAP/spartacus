import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  CmsModule,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { ProductSummaryComponent } from './product-summary.component';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    OutletModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductSummaryComponent: {
          component: ProductSummaryComponent,
        },
      },
    }),
  ],
  declarations: [ProductSummaryComponent],
  entryComponents: [ProductSummaryComponent],
  exports: [ProductSummaryComponent],
})
export class ProductSummaryModule {}
