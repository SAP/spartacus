/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import { Observable, ReplaySubject } from 'rxjs';
import { vi } from 'vitest';

/** Mock: ConfiguratorRouterExtractorService provides the router data observable. */
export class MockConfiguratorRouterExtractorService {
  public routeDataSubject = new ReplaySubject<ConfiguratorRouter.Data>(1);
  routerData$ = this.routeDataSubject.asObservable();

  extractRouterData = vi
    .fn()
    .mockImplementation(
      (): Observable<ConfiguratorRouter.Data> => this.routerData$
    );
}
