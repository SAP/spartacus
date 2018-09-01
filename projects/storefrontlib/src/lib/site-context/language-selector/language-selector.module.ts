import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';

import { SharedModule } from '../shared/shared.module';
import { SiteContextModuleConfig } from '../site-context-module-config';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
  providers: [SiteContextModuleConfig]
})
export class LanguageSelectorModule {}
