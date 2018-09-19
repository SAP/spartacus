import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../../../../ui/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { CartDetailsModule } from '../../../../cart/components/cart-details/cart-details.module';
import { CartSharedModule } from '../../../../cart/components/cart-shared/cart-shared.module';

@NgModule({
  imports: [CommonModule, CardModule, CartDetailsModule, CartSharedModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent]
})
export class ReviewSubmitModule {}
