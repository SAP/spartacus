import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GlobalMessageService } from '@spartacus/core';
import { GlobalMessageComponent } from './components/global-message.component';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [GlobalMessageComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    GlobalMessageService
  ],
  exports: [GlobalMessageComponent]
})
export class GlobalMessageModule {}
