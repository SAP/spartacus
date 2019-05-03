import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { PageComponentModule } from '../../../../cms-structure/page/component/page-component.module';
import { CmsModule } from '../../../cms/cms.module'; // some slots are loaded inside components (i.e. tabs)
import { OutletModule } from '../../../outlet/index';
import { ComponentsModule } from './../../../ui/components/components.module';
import { ProductTabsComponent } from './container/product-tabs.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { ProductDetailsTabModule } from './product-details-tab/product-details-tab.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CartSharedModule,
    CmsModule,
    OutletModule,
    ProductReviewsModule,
    ProductDetailsTabModule,
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSTabParagraphContainer: {
          selector: 'cx-product-tabs',
        },
        ProductDetailsTabComponent: {
          selector: 'cx-product-details-tab',
        },
        ProductSpecsTabComponent: {
          selector: 'cx-product-attributes',
        },
        ProductReviewsTabComponent: {
          selector: 'cx-product-reviews',
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
  entryComponents: [ProductTabsComponent, ProductAttributesComponent],
  providers: [ProductService, WindowRef, RoutingService],
})
export class ProductTabsModule {}
