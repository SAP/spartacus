/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { AsmCreateCustomerFormComponent } from './asm-create-customer-form.component';

export const defaultAsmCreateCustomerFormLayoutConfig: LayoutConfig = {
  launch: {
    ASM_CREATE_CUSTOMER_FORM: {
      inlineRoot: true,
      component: AsmCreateCustomerFormComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
