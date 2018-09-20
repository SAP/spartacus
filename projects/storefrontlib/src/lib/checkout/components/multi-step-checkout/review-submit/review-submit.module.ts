import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../../../../ui/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { CartDetailsModule } from '../../../../cart/components/cart-details/cart-details.module';

@NgModule({
  imports: [CommonModule, CardModule, CartDetailsModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent]
})
export class ReviewSubmitModule {}
