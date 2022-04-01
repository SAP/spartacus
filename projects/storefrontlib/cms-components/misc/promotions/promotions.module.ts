import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PromotionsComponent } from './promotions.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PromotionsComponent],
  exports: [PromotionsComponent],
})
export class PromotionsModule {}
