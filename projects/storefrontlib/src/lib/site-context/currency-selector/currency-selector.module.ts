import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from './currency-selector.component';

import { SharedModule } from '../shared/shared.module';
import { SiteContextModuleConfig } from '../site-context-module-config';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CurrencySelectorComponent],
  exports: [CurrencySelectorComponent],
  providers: [SiteContextModuleConfig]
})
export class CurrencySelectorModule {}
