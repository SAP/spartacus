import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeHeaderComponent } from './configurator-attribute-header.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    NgSelectModule,
  ],
  declarations: [ConfiguratorAttributeHeaderComponent],
  exports: [ConfiguratorAttributeHeaderComponent],
})
export class ConfiguratorAttributeHeaderModule {}
