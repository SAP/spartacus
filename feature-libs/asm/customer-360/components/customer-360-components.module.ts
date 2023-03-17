import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  PageComponentModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { AsmProductItemComponent } from './asm-product-item/asm-product-item.component';
import { Customer360Component } from './customer-360/asm-customer-360.component';
import { AsmCustomerActiveCartModule } from './sections/asm-customer-active-cart/asm-customer-active-cart.module';
import { AsmCustomerActivityModule } from './sections/asm-customer-activity/asm-customer-activity.module';
import { AsmCustomerMapComponentModule } from './sections/asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerProductInterestsModule } from './sections/asm-customer-product-interests/asm-customer-product-interests.module';
import { AsmCustomerProductReviewsComponentModule } from './sections/asm-customer-product-reviews/asm-customer-product-reviews.component.module';
import { AsmCustomerProfileModule } from './sections/asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerSavedCartModule } from './sections/asm-customer-saved-cart/asm-customer-saved-cart.module';
import { AsmCustomerSectionComponent } from './sections/asm-customer-section/asm-customer-section.component';
import {
  AsmCustomerActiveCartComponent,
  AsmCustomerActivityComponent,
  AsmCustomerMapComponent,
  AsmCustomerProductInterestsComponent,
  AsmCustomerProductReviewsComponent,
  AsmCustomerProfileComponent,
  AsmCustomerSavedCartComponent,
} from './sections/components';

@NgModule({
  imports: [
    CommonModule,
    StarRatingModule,
    I18nModule,
    ArgsModule,
    MediaModule,
    IconModule,
    KeyboardFocusModule,
    PageComponentModule,
    AsmCustomerActiveCartModule,
    AsmCustomerProductInterestsModule,
    AsmCustomerSavedCartModule,
    AsmCustomerProfileModule,
    AsmCustomerActivityModule,
    AsmCustomerMapComponentModule,
    AsmCustomerProductReviewsComponentModule,
  ],
  declarations: [
    AsmProductItemComponent,
    Customer360Component,
    AsmCustomerSectionComponent,
  ],
  exports: [Customer360Component],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        AsmCustomer360Component: {
          component: Customer360Component,
        },
        AsmCustomer360ProfileComponent: {
          component: AsmCustomerProfileComponent,
        },
        AsmCustomer360ActiveCartComponent: {
          component: AsmCustomerActiveCartComponent,
        },
        AsmCustomer360ProductInterestsComponent: {
          component: AsmCustomerProductInterestsComponent,
        },
        AsmCustomer360ProductReviewsComponent: {
          component: AsmCustomerProductReviewsComponent,
        },
        AsmCustomer360SavedCartComponent: {
          component: AsmCustomerSavedCartComponent,
        },
        AsmCustomer360CustomerActivityComponent: {
          component: AsmCustomerActivityComponent,
        },
        AsmCustomer360MapComponent: {
          component: AsmCustomerMapComponent,
        },
      },
    }),
  ],
})
export class Customer360ComponentsModule {}
