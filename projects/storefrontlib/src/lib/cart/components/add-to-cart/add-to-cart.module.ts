import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [AddToCartComponent],
  entryComponents: [AddToCartComponent],
  exports: [AddToCartComponent]
})
export class AddToCartModule {}
