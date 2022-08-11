import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfirmationMessageComponent } from './confirmation-message.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
  ],
  declarations: [ConfirmationMessageComponent],
})
export class ConfirmationMessageModule {}
