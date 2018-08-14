import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ComponentsModule } from './../../../ui/components/components.module';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ComponentsModule],
  declarations: [CartItemComponent],
  exports: [CartItemComponent, CommonModule, RouterModule, ReactiveFormsModule]
})
export class CartSharedModule {}
