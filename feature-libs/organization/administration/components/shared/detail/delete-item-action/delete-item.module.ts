import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfirmationMessageModule } from '../../message/confirmation/confirmation-message.module';
import { MessageModule } from '../../message/message.module';
import { DeleteItemComponent } from './delete-item.component';

@NgModule({
  imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule],
  declarations: [DeleteItemComponent],
  exports: [DeleteItemComponent],
})
export class DeleteItemModule {}
