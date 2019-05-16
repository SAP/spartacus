import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../../shared/index';
import { CartSharedModule } from './../cart-shared/cart-shared.module';
import { AddToCartComponent } from './add-to-cart.component';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import { IconModule } from '../../../../cms-components/misc/icon/index';
import { AutoFocusDirectiveModule } from '../../../../shared/directives/auto-focus/auto-focus.directive.module';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductAddToCartComponent: { selector: 'cx-add-to-cart' },
      },
    }),
    UrlModule,
    IconModule,
    I18nModule,
    AutoFocusDirectiveModule,
  ],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  entryComponents: [AddToCartComponent, AddedToCartDialogComponent],
  exports: [AddToCartComponent],
})
export class AddToCartModule {}
