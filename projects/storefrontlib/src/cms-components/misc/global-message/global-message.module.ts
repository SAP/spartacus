import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GlobalMessageModule, I18nModule } from '@spartacus/core';

import { GlobalMessageComponent } from './global-message.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    I18nModule,
    GlobalMessageModule.forRoot(),
  ],
  declarations: [GlobalMessageComponent],
  exports: [GlobalMessageComponent],
})
export class GlobalMessageComponentModule {}
