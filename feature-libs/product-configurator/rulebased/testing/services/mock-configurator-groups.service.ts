/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockConfiguratorGroupsService {
  currentGroup$: Observable<Configurator.Group | undefined> = of(undefined);

  getCurrentGroupId(): Observable<string | undefined> {
    return this.currentGroup$.pipe(map((group) => group?.id));
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
  getCurrentGroup(): Observable<Configurator.Group | undefined> {
    return this.currentGroup$;
  }
  getConflictGroupForImmediateConflictResolution(): Observable<Configurator.Group | undefined> {
    return EMPTY;
  }
  setGroupStatusVisited(): void {}
  navigateToGroup(): Observable<unknown> {
    return of(undefined);
  }
  getNextGroupId(): Observable<string | undefined> {
    return of('nextGroupId');
  }
  getNextGroupDescription(): Observable<string> {
    return of('nextGroupDescription');
  }
  getPreviousGroupId(): Observable<string | undefined> {
    return of('previousGroupId');
  }
  getPreviousGroupDescription(): Observable<string> {
    return of('previousGroupDescription');
  }
  isGroupVisited(): Observable<boolean> {
    return of(false);
  }
  getParentGroup(): Configurator.Group | undefined {
    return undefined;
  }
  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }
  isConflictGroupType(): boolean {
    return false;
  }
}
