import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Config, I18nModule, UrlModule } from '@spartacus/core';
import {
  GenericConfiguratorModule,
  IconModule,
  MessageConfig,
  SpinnerModule,
} from '@spartacus/storefront';
import { InteractiveConfigurationModule } from './interactive-configuration.module';
import { OverviewModule } from './overview.module';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    FormsModule,
    I18nModule,
    ReactiveFormsModule,
    InteractiveConfigurationModule,
    OverviewModule,
    NgSelectModule,
    SpinnerModule,
    IconModule,
    GenericConfiguratorModule,
  ],
})
export class VariantConfiguratorModule {
  static forRoot(): ModuleWithProviders<VariantConfiguratorModule> {
    return {
      ngModule: VariantConfiguratorModule,
      providers: [[{ provide: MessageConfig, useExisting: Config }]],
    };
  }
}
