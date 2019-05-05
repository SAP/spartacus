import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CartSharedModule } from '../../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';

@NgModule({
  imports: [CommonModule, CardModule, CartSharedModule, I18nModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent],
})
export class ReviewSubmitModule {}
