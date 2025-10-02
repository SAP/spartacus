/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { IconComponent } from '../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';
@Component({
  selector: 'cx-punchout-error',
  templateUrl: './punchout-error.component.html',
  imports: [IconComponent, TranslatePipe, MockTranslatePipe],
})
export class PunchoutErrorComponent {
  iconTypes = ICON_TYPE;
}
