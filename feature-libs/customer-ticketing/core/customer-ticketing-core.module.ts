import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultCustomerTicketingConfig } from './config';

@NgModule({
  providers: [provideDefaultConfig(defaultCustomerTicketingConfig)],
})
export class CustomerTicketingCoreModule {}
