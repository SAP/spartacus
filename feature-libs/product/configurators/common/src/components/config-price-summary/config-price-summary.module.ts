import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfigPriceSummaryComponent } from './config-price-summary.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationPriceSummary: {
          component: ConfigPriceSummaryComponent,
        },
      },
    }),
  ],
  declarations: [ConfigPriceSummaryComponent],
  exports: [ConfigPriceSummaryComponent],
  entryComponents: [ConfigPriceSummaryComponent],
})
export class ConfigPriceSummaryModule {}
