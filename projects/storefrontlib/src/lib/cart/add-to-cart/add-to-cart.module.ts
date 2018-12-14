import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSharedModule } from './../cart-shared/cart-shared.module';
import { SpinnerModule } from './../../ui/components/spinner/spinner.module';
import { AddToCartComponent } from './add-to-cart.component';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductAddToCartComponent: { selector: 'cx-add-to-cart' }
      }
    })
  ],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  entryComponents: [AddedToCartDialogComponent],
  exports: [AddToCartComponent]
})
export class AddToCartModule {}
