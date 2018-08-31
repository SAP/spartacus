import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from '../../../../ui/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { CartModule } from '../../../../cart/cart.module';

@NgModule({
  imports: [CommonModule, FormsModule, CardModule, CartModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent]
})
export class ReviewSubmitModule {}
