/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from "@spartacus/core";

// import { Injectable } from '@angular/core';
// import { Config } from '@spartacus/core';

  // @Injectable({
  //   providedIn: 'root',
  //   useExisting: Config,
  // })
  // export abstract class CdpConfig {
  //   cdc?: {
  //     baseSite: string;
  //     javascriptUrl: string;
  //     sessionExpiration: number;
  //   }[];
  // }

  // declare module '@spartacus/core' {
  //   interface Config extends CdpConfig {}
  // }

  export const CdpConfig: RoutingConfig = {
    routing: {
      routes: {
        orders: {
          paths: ['my-account/orders'],
        },
        myAccount: {
          paths: ['my-account'],
        },
        orderDetails: {
          paths: ['my-account/order/:orderCode'],
          paramsMapping: { orderCode: 'code' },
        },
    }
  }
  };
