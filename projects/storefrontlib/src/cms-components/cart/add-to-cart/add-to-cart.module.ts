import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import {
  ItemCounterModule,
  ModalModule,
  SpinnerModule,
} from '../../../shared/index';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';
import { CartSharedModule } from './../cart-shared/cart-shared.module';
import { AddToCartComponent } from './add-to-cart.component';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartSharedModule,
    RouterModule,
    SpinnerModule,
    PromotionsModule,
    FeaturesConfigModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    ModalModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductAddToCartComponent: {
          component: AddToCartComponent,
        },
      },
    }),
  ],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  exports: [AddToCartComponent, AddedToCartDialogComponent],
})
export class AddToCartModule {}
