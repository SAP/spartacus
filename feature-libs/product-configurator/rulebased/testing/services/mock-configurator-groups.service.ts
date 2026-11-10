/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EMPTY, map, Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { Configurator } from '../../core/model/configurator.model';

/** Mock: ConfiguratorGroupsService exposes the current group stream and navigation helpers. */
export class MockConfiguratorGroupsService {
  currentGroup$: Observable<Configurator.Group | undefined> = of(undefined);

  getCurrentGroupId = vi.fn().mockImplementation(() => {
    return this.currentGroup$.pipe(
      map((currentGroup: Configurator.Group | undefined) => {
        return currentGroup ? currentGroup.id : undefined;
      })
    );
  });
  getFirstConflictGroup = vi.fn().mockReturnValue(undefined);
  navigateToFirstIncompleteGroup = vi.fn();
  navigateToConflictSolver = vi.fn();
  navigateToContainerRow = vi.fn();
  getMenuParentGroup = vi.fn().mockReturnValue(of(undefined));
  setMenuParentGroup = vi.fn();
  getCurrentGroup = vi.fn().mockImplementation(() => this.currentGroup$);
  getGroupTitle = vi.fn().mockReturnValue(of(''));
  getConflictGroupForImmediateConflictResolution = vi
    .fn()
    .mockReturnValue(EMPTY);
  setGroupStatusVisited = vi.fn();
  navigateToGroup = vi.fn().mockReturnValue(of(undefined));
  getNextGroupId = vi.fn().mockReturnValue(of('nextGroupId'));
  getNextGroupDescription = vi.fn().mockReturnValue(of('nextGroupDescription'));
  getPreviousGroupId = vi.fn().mockReturnValue(of('previousGroupId'));
  getPreviousGroupDescription = vi
    .fn()
    .mockReturnValue(of('previousGroupDescription'));
  isGroupVisited = vi.fn().mockReturnValue(of(false));
  getParentGroup = vi.fn().mockReturnValue(undefined);
  hasSubGroups = vi
    .fn()
    .mockImplementation((group: Configurator.Group) =>
      group.subGroups ? group.subGroups.length > 0 : false
    );
  isConflictGroupType = vi.fn().mockReturnValue(false);
  getGroupStatus = vi.fn().mockReturnValue(of(null));
  findParentGroup = vi.fn().mockReturnValue(null);
}
