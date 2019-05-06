import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '@spartacus/core';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
