/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';

/** Mock: CommonConfiguratorUtilsService stubs owner decomposition. */
export class MockCommonConfiguratorUtilsService {
  decomposeOwnerId = vi.fn().mockImplementation((ownerId: string) => {
    const parts: string[] = ownerId.split('+');
    return { documentId: parts[0], entryNumber: parts[1] };
  });
}
