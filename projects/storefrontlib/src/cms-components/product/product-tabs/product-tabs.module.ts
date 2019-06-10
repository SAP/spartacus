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
import { CartSharedModule } from '../../cart/index';
// guards
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductDetailsTabModule } from './product-details-tab/product-details-tab.module';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { ProductDetailsTabComponent } from './product-details-tab/product-details-tab.component';

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
    ProductDetailsTabModule,
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductDetailsTabComponent: {
          component: ProductDetailsTabComponent,
        },
        ProductSpecsTabComponent: {
          component: ProductAttributesComponent,
        },
        ProductReviewsTabComponent: {
          component: ProductReviewsComponent,
        },
      },
    }),
    I18nModule,
  ],
  declarations: [ProductAttributesComponent],
  exports: [ProductAttributesComponent, ProductReviewsComponent],
  entryComponents: [ProductAttributesComponent],
  providers: [ProductService, WindowRef, RoutingService],
})
export class ProductTabsModule {}
