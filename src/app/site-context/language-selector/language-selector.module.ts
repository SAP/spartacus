import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';

import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../config.service';

@NgModule({
  imports: [CommonModule, SharedModule.forRoot(ConfigService)],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
  providers: [ConfigService]
})
export class LanguageSelectorModule {}
