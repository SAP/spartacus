import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { PopoverModule } from '../popover/popover.module';
import { TruncateTextWithPopoverComponent } from './truncate-text-with-popover.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [CommonModule, I18nModule, PopoverModule],
  declarations: [TruncateTextWithPopoverComponent, TruncatePipe],
  entryComponents: [TruncateTextWithPopoverComponent],
  exports: [TruncateTextWithPopoverComponent, TruncatePipe],
})
export class TruncateTextWithPopoverModule {}
