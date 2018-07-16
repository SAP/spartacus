import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ItemCounterComponent } from './item-counter/item-counter.component';
import { MediaModule } from './../../../ui/components/media/media.module';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MediaModule],
  declarations: [CartItemComponent, ItemCounterComponent],
  exports: [
    CartItemComponent,
    ItemCounterComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CartSharedModule {}
