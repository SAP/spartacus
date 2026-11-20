/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { CommonConfigurator } from '../../../core/model/common-configurator.model';
import { ConfiguratorModelUtils } from '../../../shared/utils/configurator-model-utils';
import { ConfiguratorRouter } from '../configurator-router-data';
import { ConfiguratorRouterExtractorService } from '../configurator-router-extractor.service';

/**
 * Mock of {@link ConfiguratorRouterExtractorService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorRouterExtractorService
  implements Partial<ConfiguratorRouterExtractorService>
{
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return EMPTY;
  }

  createOwnerFromRouterState(): CommonConfigurator.Owner {
    return ConfiguratorModelUtils.createInitialOwner();
  }
}
