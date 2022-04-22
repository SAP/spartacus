import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { PopoverModule } from '../popover/popover.module';
import { TruncateTextPopoverComponent } from './truncate-text-popover.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [CommonModule, I18nModule, PopoverModule],
  declarations: [TruncateTextPopoverComponent, TruncatePipe],
  exports: [TruncateTextPopoverComponent, TruncatePipe],
})
export class TruncateTextPopoverModule {}
