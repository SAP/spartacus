import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog.component';

export const defaultCustomerTicketingFormLayoutConfig: LayoutConfig = {
  launch: {
    CUSTOMER_TICKETING: {
      inline: true,
      component: CustomerTicketingReopenDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
