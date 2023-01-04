/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingCloseDialogComponent } from '../../details/customer-ticketing-close';
import { CustomerTicketingCreateDialogComponent } from '../../list/customer-ticketing-create';
import { CustomerTicketingReopenDialogComponent } from '../../details/customer-ticketing-reopen';

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
