import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ConfiguratorMessageComponent } from './configurator-message.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule],
  declarations: [ConfiguratorMessageComponent],
  exports: [ConfiguratorMessageComponent],
  entryComponents: [ConfiguratorMessageComponent],
})
export class ConfiguratorMessageModule {}
