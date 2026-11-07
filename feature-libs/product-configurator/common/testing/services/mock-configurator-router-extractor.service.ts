/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, ReplaySubject } from 'rxjs';
import { ConfiguratorRouter } from '../../components/service/configurator-router-data';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorRouterExtractorService {
  routeDataSubject = new ReplaySubject<ConfiguratorRouter.Data>(1);
  routerData$ = this.routeDataSubject.asObservable();

  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return this.routerData$;
  }

  createOwnerFromRouterState(): ConfiguratorRouter.Data['owner'] {
    return undefined as unknown as ConfiguratorRouter.Data['owner'];
  }
}
