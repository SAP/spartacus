import { NgModule, Type } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CdpCustomerTicketingModule } from 'integration-libs/cdp/customer-ticketing';
import { CustomerTicketingModule } from '@spartacus/customer-ticketing';

const extensions: Type<any>[] = [];

if (environment.cdp) {
  extensions.push(CdpCustomerTicketingModule);
}

@NgModule({
  imports: [CustomerTicketingModule, ...extensions],
})
export class CustomerTicketingWrapperModule {}
