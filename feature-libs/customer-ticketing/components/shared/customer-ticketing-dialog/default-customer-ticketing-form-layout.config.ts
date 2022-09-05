import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from '../../customer-ticketing-create';
import { CustomerTicketingReopenDialogComponent } from '../../customer-ticketing-reopen';

export const defaultCustomerTicketingFormLayoutConfig: LayoutConfig = {
  launch: {
    CUSTOMER_TICKETING_REOPEN: {
      inline: true,
      component: CustomerTicketingReopenDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
    CUSTOMER_TICKETING_CREATE: {
      inline: true,
      component: CustomerTicketingCreateDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
