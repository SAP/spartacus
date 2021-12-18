import { NgModule } from '@angular/core';
import { AddToCartDialogEventListener } from './add-to-cart-dialog-event.listener';

@NgModule({})
export class CartComponentsEventModule {
  constructor(_addToCartDialogEventListener: AddToCartDialogEventListener) {}
}
