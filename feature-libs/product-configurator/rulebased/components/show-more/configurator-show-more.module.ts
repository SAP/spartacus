import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorShowMoreComponent } from './configurator-show-more.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfiguratorShowMoreComponent],
  exports: [ConfiguratorShowMoreComponent],
})
export class ConfiguratorShowMoreModule {}
