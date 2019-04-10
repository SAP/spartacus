import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '@spartacus/core';
import { CardModule } from '../../../../ui/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { CartSharedModule } from '../../../../cart/cart-shared/cart-shared.module';

@NgModule({
  imports: [CommonModule, CardModule, CartSharedModule, I18nModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent],
})
export class ReviewSubmitModule {}
