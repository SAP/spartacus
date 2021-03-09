import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorCPQCartEntryInfoComponent } from './configurator-cpq-cart-entry-info.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfiguratorCPQCartEntryInfoComponent],
  exports: [ConfiguratorCPQCartEntryInfoComponent],
  entryComponents: [ConfiguratorCPQCartEntryInfoComponent],
})
export class ConfiguratorCpqCartEntryInfoComponentModule {}
