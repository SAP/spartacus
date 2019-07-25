import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '@spartacus/core';
import { CardComponent } from './card.component';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
