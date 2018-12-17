import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../../../../ui/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { CartSharedModule } from '../../../../cart/cart-shared/cart-shared.module';

@NgModule({
  imports: [CommonModule, CardModule, CartSharedModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent]
})
export class ReviewSubmitModule {}
