import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CartSharedModule } from './../cart-shared/cart-shared.module';
import { AddToCartComponent } from './add-to-cart.component';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import { SpinnerModule } from './../../../ui/components/spinner/spinner.module';

@NgModule({
  imports: [MaterialModule, CartSharedModule, SpinnerModule],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  entryComponents: [AddedToCartDialogComponent],
  exports: [AddToCartComponent]
})
export class AddToCartModule {}
