import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeFooterComponent } from './configurator-attribute-footer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
  ],
  declarations: [ConfiguratorAttributeFooterComponent],
  exports: [ConfiguratorAttributeFooterComponent],
})
export class ConfiguratorAttributeFooterModule {}
