import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GlobalMessageModule } from '@spartacus/core';

import { GlobalMessageComponent } from './global-message.component';

import { interceptors } from './http-interceptors/';

@NgModule({
  imports: [CommonModule, HttpClientModule, GlobalMessageModule],
  declarations: [GlobalMessageComponent],
  exports: [GlobalMessageComponent]
})
export class GlobalMessageComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalMessageComponentModule,
      providers: [...interceptors]
    };
  }
}
