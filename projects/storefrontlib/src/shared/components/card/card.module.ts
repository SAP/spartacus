import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from 'projects/storefrontlib/src/layout';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
