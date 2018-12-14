import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './container/cart-details.component';

@NgModule({
  imports: [CartSharedModule, CommonModule],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent]
})
export class CartDetailsModule {}
