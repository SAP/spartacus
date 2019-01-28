import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, UrlTranslationModule } from '@spartacus/core';

import { CartSharedModule } from './../cart-shared/cart-shared.module';
import { SpinnerModule } from './../../ui/components/spinner/spinner.module';
import { AddToCartComponent } from './add-to-cart.component';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductAddToCartComponent: { selector: 'cx-add-to-cart' }
      }
    }),
    UrlTranslationModule
  ],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  entryComponents: [AddedToCartDialogComponent],
  exports: [AddToCartComponent]
})
export class AddToCartModule {}
