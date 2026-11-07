/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { EMPTY, Observable } from 'rxjs';
import { CommonConfigurator } from '../../core/model/common-configurator.model';

/**
 * Methods implement the real service surface with sensible defaults; override
 * any of them per test with `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
export class MockCommonConfiguratorUtilsService {
  setOwnerKey(owner: CommonConfigurator.Owner): void {
    owner.key = owner.type + '/' + owner.id;
  }

  getComposedOwnerId(documentId: string, entryNumber: number): string {
    return documentId + '+' + entryNumber;
  }

  decomposeOwnerId(ownerId: string): { documentId: string; entryNumber: string } {
    const parts: string[] = ownerId.split('+');
    return { documentId: parts[0], entryNumber: parts[1] };
  }

  getCartId(_cart?: Cart): string {
    return '';
  }

  hasIssues(_cartItem: OrderEntry): boolean {
    return false;
  }

  getNumberOfIssues(_cartItem: OrderEntry): number {
    return 0;
  }

  isAttributeBasedConfigurator(_configuratorType: string | undefined): boolean {
    return true;
  }

  isBundleBasedConfigurator(_configuratorType: string | undefined): boolean {
    return false;
  }

  isActiveCartContext(): Observable<boolean> {
    return EMPTY;
  }

  getSlotsFromLayoutConfiguration(): string[] {
    return [];
  }
}
