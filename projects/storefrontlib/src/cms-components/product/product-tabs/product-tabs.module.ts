import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  CmsModule,
  ConfigModule,
  I18nModule,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { PageComponentModule } from '../../../cms-structure/page/index';
import { CartSharedModule } from '../../checkout/index';
// guards
import { ProductTabsComponent } from './container/product-tabs.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CartSharedModule,
    CmsModule,
    OutletModule,
    ProductReviewsModule,
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSTabParagraphContainer: {
          selector: 'cx-product-tabs',
        },
      },
    }),
    I18nModule,
  ],
  declarations: [ProductAttributesComponent, ProductTabsComponent],
  exports: [
    ProductAttributesComponent,
    ProductReviewsComponent,
    ProductTabsComponent,
  ],
  entryComponents: [ProductTabsComponent],
  providers: [ProductService, WindowRef, RoutingService],
})
export class ProductTabsModule {}
