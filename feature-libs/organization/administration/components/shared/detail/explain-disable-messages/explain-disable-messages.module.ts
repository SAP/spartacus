import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplainDisableMessagesComponent } from './explain-disable-messages.component';
import { IconModule } from '@spartacus/storefront';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  declarations: [ExplainDisableMessagesComponent],
  exports: [ExplainDisableMessagesComponent],
})
export class ExplainDisableMessagesModule {}
