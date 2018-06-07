import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart.component';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import { MaterialModule } from '../../../material.module';
import { CartSharedModule } from './../cart-shared/cart-shared.module';

@NgModule({
  imports: [MaterialModule, CartSharedModule],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  entryComponents: [AddedToCartDialogComponent],
  exports: [AddToCartComponent]
})
export class AddToCartModule {}
