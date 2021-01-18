import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorPriceComponent } from './configurator-price.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ConfiguratorPriceComponent],
  exports: [ConfiguratorPriceComponent],
  entryComponents: [ConfiguratorPriceComponent],
})
export class ConfiguratorPriceModule {}
