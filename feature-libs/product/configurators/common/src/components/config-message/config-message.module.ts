import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ConfigMessageComponent } from './config-message.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  declarations: [ConfigMessageComponent],
  exports: [ConfigMessageComponent],
  entryComponents: [ConfigMessageComponent],
})
export class ConfigMessageModule {}
