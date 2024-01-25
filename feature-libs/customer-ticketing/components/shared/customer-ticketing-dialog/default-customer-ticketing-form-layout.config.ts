/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingCloseDialogComponent } from '../../details/customer-ticketing-close/customer-ticketing-close-dialog/customer-ticketing-close-dialog.component';
import { CustomerTicketingCreateDialogComponent } from '../../list/customer-ticketing-create/customer-ticketing-create-dialog/customer-ticketing-create-dialog.component';
import { CustomerTicketingReopenDialogComponent } from '../../details/customer-ticketing-reopen/customer-ticketing-reopen-dialog/customer-ticketing-reopen-dialog.component';

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
