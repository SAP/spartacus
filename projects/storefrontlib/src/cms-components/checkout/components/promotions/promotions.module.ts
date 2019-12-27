import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PromotionsComponent } from './promotions.component';
import { FeaturesConfigModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, FeaturesConfigModule],
  declarations: [PromotionsComponent],
  exports: [PromotionsComponent],
})
export class PromotionsModule {}
