import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductURLPipe } from './product-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductURLPipe],
  exports: [ProductURLPipe],
})
export class ProductUrlModule {}
