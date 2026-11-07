/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { MockCommonConfiguratorUtilsService } from './mock-common-configurator-utils.service';

describe('MockCommonConfiguratorUtilsService', () => {
  let mock: MockCommonConfiguratorUtilsService;

  beforeEach(() => {
    mock = new MockCommonConfiguratorUtilsService();
  });

  it('should expose documented defaults', () => {
    expect(mock.decomposeOwnerId('doc+1')).toEqual({
      documentId: 'doc',
      entryNumber: '1',
    });
    expect(mock.getComposedOwnerId('doc', 1)).toBe('doc+1');
    expect(mock.isAttributeBasedConfigurator('x')).toBe(true);
    expect(mock.hasIssues({})).toBe(false);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'isActiveCartContext').mockReturnValue(of(true));
    expect(mock.isActiveCartContext()).toBeTruthy();
  });
});
