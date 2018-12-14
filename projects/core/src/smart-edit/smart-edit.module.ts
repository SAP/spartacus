import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CmsTicketInterceptor } from './cms-ticket.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CmsTicketInterceptor,
      multi: true
    }
  ]
})
export class SmartEditModule {}
