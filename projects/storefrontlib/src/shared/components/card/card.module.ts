import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { TruncateTextPopoverModule } from '../truncate-text-popover/truncate-text-popover.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, TruncateTextPopoverModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
