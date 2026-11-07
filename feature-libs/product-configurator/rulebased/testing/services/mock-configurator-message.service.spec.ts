/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockConfiguratorMessageService } from './mock-configurator-message.service';

describe('MockConfiguratorMessageService', () => {
  let mock: MockConfiguratorMessageService;

  beforeEach(() => {
    mock = new MockConfiguratorMessageService();
  });

  it('should expose documented defaults', () => {
    expect(mock.splitMessagesBySeverity()).toEqual({
      errorMessages: [],
      warningMessages: [],
    });
    expect(mock.filterMessagesByProductSelection()).toEqual([]);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    vi.spyOn(mock, 'buildSeverityMessageGroups').mockReturnValue([{} as any]);
    expect(mock.buildSeverityMessageGroups()).toHaveLength(1);
  });
});
