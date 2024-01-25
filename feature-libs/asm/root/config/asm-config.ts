/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config, User } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { CustomerListColumnActionType } from '../model/customer-list.model';
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AsmConfig {
  asm?: {
    agentSessionTimer?: {
      startingDelayInSeconds?: number;
    };
    customerSearch?: {
      maxResults?: number;
    };
    customerList?: {
      pageSize?: number;
      showAvatar?: boolean;
      columns?: {
        headerLocalizationKey: string;
        icon?: {
          symbol?: ICON_TYPE;
          captionLocalizationKey?: string;
        };
        renderer?: (customer: User) => string;
        actionType?: CustomerListColumnActionType;
      }[];
    };
    userIdHttpHeader?: {
      /**
       * To fix certain features when a customer agent is emulating a user, we must send a header called
       * "sap-commerce-cloud-user-id" to the backend fetching certain data as the user, rather than the
       * agent. However, the header will break instances of Commerce Cloud who do not allow requests with
       * this header. (For example, the configuration "corsfilter.commercewebservices.allowedHeaders" will
       * need to allow it.)
       *
       * Enabling this feature will send the emulated user's IDs on requests that need it as context.
       */
      enable?: boolean;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
