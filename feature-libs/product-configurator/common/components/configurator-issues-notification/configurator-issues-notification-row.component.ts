/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

// SPIKE NEW:
@Component({
  selector: 'cx-configurator-issues-notification-row',
  template: `
    <tr>
      <td colspan="4">
        <cx-configurator-issues-notification></cx-configurator-issues-notification>
      </td>
    </tr>
  `,
})
export class ConfiguratorIssuesNotificationRowComponent {}
