import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlPipe } from './url.pipe';
import { ProductURLPipe } from './product-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [UrlPipe, ProductURLPipe],
  exports: [UrlPipe, ProductURLPipe],
})
export class UrlModule {}
