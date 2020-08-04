import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfigOverviewAttributeComponent } from './config-overview-attribute.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfigOverviewAttributeComponent],
  exports: [ConfigOverviewAttributeComponent],
  entryComponents: [ConfigOverviewAttributeComponent],
})
export class ConfigOverviewAttributeModule {}
