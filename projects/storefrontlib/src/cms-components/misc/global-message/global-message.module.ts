import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { GlobalMessageComponent } from './global-message.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, IconModule, I18nModule],
  declarations: [GlobalMessageComponent],
  exports: [GlobalMessageComponent],
})
export class GlobalMessageComponentModule {}
