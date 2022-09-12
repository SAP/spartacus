/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ViewConfig {
  view?: {
    /**
     * Configurations related to the view of the application
     */
    defaultPageSize?: number;
    infiniteScroll?: {
      active?: boolean;
      productLimit?: number;
      showMoreButton?: boolean;
    };
  };
}

declare module '@commerce-storefront-toolset/core' {
  interface Config extends ViewConfig {}
}
