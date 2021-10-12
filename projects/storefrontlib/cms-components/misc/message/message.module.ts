import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [MessageComponent],
  exports: [MessageComponent],
})
export class MessageComponentModule {}
