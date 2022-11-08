import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CustomerTicketingConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { BadTicketRequestHandler } from './http-interceptors/handlers/bad-ticket-request.handler';

@NgModule({
  providers: [
    ...facadeProviders,
    {
      provide: HttpErrorHandler,
      useExisting: BadTicketRequestHandler,
      multi: true,
    },
    CustomerTicketingConnector
  ],
})
export class CustomerTicketingCoreModule {}
