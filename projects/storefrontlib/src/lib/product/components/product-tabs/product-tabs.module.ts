import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  CmsConfig,
  ConfigModule,
  ProductService,
  RoutingService,
  WindowRef,
  I18nModule,
} from '@spartacus/core';
import { CmsModule } from '../../../cms/cms.module'; // some slots are loaded inside components (i.e. tabs)
// guards
import { CartSharedModule } from './../../../cart/cart-shared/cart-shared.module';
import { ComponentsModule } from './../../../ui/components/components.module';
import { AddToCartModule } from '../../../cart/add-to-cart/add-to-cart.module';
import { OutletModule } from '../../../outlet/index';
import { ProductTabsComponent } from './container/product-tabs.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { PageComponentModule } from '../../../../cms-structure/page/component/page-component.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CartSharedModule,
    CmsModule,
    AddToCartModule,
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
