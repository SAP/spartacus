/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActivatedRouteSnapshot, Data, Route } from '@angular/router';
import { PageContext } from './page-context.model';

export interface CmsRouteData extends Data {
  cxCmsRouteContext?: PageContext;
  pageLabel?: string;
}

export interface CmsRoute extends Route {
  data?: CmsRouteData;
}

export interface CmsActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  data: CmsRouteData;
}
