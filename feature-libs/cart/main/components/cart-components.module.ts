import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WishListModule } from './wish-list/wish-list.module';

@NgModule({
  imports: [CommonModule, WishListModule],
})
export class CartComponentsModule {}
