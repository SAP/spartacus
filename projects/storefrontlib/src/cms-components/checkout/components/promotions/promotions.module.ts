import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PromotionsComponent } from './promotions.component';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
 @NgModule({
  imports: [CommonModule],
  declarations: [PromotionsComponent],
  exports: [PromotionsComponent],
})
export class PromotionsModule {}
