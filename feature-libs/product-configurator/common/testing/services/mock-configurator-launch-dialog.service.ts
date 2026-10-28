/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { vi } from 'vitest';

/** Mock: LaunchDialogService provides optional data$ and stubs open and close. */
export class MockConfiguratorLaunchDialogService
  implements Partial<LaunchDialogService>
{
  data$: Observable<unknown> = EMPTY;

  openDialogAndSubscribe = vi.fn();
  closeDialog = vi.fn();
}
