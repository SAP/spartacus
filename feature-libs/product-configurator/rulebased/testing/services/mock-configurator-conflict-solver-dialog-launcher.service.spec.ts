/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorConflictSolverDialogLauncherService } from './mock-configurator-conflict-solver-dialog-launcher.service';

describe('MockConfiguratorConflictSolverDialogLauncherService', () => {
  let mock: MockConfiguratorConflictSolverDialogLauncherService;

  beforeEach(() => {
    mock = new MockConfiguratorConflictSolverDialogLauncherService();
  });

  it('should provide a no-op ngOnDestroy', () => {
    expect(() => mock.ngOnDestroy()).not.toThrow();
  });

  it('should allow spying on ngOnDestroy', () => {
    const spy = vi.spyOn(mock, 'ngOnDestroy');
    mock.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
