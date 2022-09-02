import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingCloseDialogComponent } from '../../customer-ticketing-close/customer-ticketing-close-dialog/customer-ticketing-close-dialog.component';
import { CustomerTicketingCreateDialogComponent } from '../../customer-ticketing-create';
import { CustomerTicketingReopenDialogComponent } from '../../customer-ticketing-reopen';

export const defaultCustomerTicketingFormLayoutConfig: LayoutConfig = {
  launch: {
    CUSTOMER_TICKETING_REOPEN: {
      inline: true,
      component: CustomerTicketingReopenDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },

    CUSTOMER_TICKETING_CLOSE: {
      inline: true,
      component: CustomerTicketingCloseDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },

    CUSTOMER_TICKETING_CREATE: {
      inline: true,
      component: CustomerTicketingCreateDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
