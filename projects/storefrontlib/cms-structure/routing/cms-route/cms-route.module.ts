/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { addCmsRoute } from './add-cms-route';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [Injector],
      useFactory: addCmsRoute,
    },
  ],
})
export class CmsRouteModule {}
