import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewSubmitComponent } from './review-submit.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent]
})
export class ReviewSubmitModule {}
