/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorGroupsService } from '../configurator-groups.service';

/**
 * Mock of {@link ConfiguratorGroupsService} for unit tests.
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConfiguratorGroupsService
  implements Partial<ConfiguratorGroupsService>
{
  getCurrentGroupId(): Observable<string> {
    return of('');
  }

  getFirstConflictGroup(): Configurator.Group | undefined {
    return undefined;
  }

  navigateToFirstIncompleteGroup(): void {}

  navigateToConflictSolver(): void {}

  navigateToContainerRow(): void {}

  getMenuParentGroup(): Observable<Configurator.Group | undefined> {
    return of(undefined);
  }

  setMenuParentGroup(): void {}

  getCurrentGroup(): Observable<Configurator.Group> {
    return EMPTY;
  }

  getConflictGroupForImmediateConflictResolution(): Observable<
    Configurator.Group | undefined
  > {
    return of(undefined);
  }

  setGroupStatusVisited(): void {}

  navigateToGroup(): void {}

  getNextGroupId(): Observable<string | undefined> {
    return of(undefined);
  }

  getNextGroupDescription(): Observable<string> {
    return of('');
  }

  getPreviousGroupId(): Observable<string | undefined> {
    return of(undefined);
  }

  getPreviousGroupDescription(): Observable<string> {
    return of('');
  }

  isGroupVisited(): Observable<boolean> {
    return of(false);
  }

  getParentGroup(): Configurator.Group | undefined {
    return undefined;
  }

  hasSubGroups(): boolean {
    return false;
  }

  isConflictGroupType(): boolean {
    return false;
  }
}
