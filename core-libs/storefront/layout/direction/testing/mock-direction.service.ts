/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { DirectionMode } from '../config/direction.model';
import { DirectionService } from '../direction.service';

/**
 * Mock of {@link DirectionService} for unit tests. Defaults to LTR.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockDirectionService implements Partial<DirectionService> {
  initialize(): Promise<any> {
    return Promise.resolve();
  }

  setDirection(): void {}

  getDirection(): DirectionMode | undefined {
    return DirectionMode.LTR;
  }
}
