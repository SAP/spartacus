import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEnableMessageComponent } from './edit-enable-message.component';
import { IconModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [EditEnableMessageComponent],
  exports: [EditEnableMessageComponent],
})
export class EditEnableMessageModule {}
