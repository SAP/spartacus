/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';

export interface PasswordInputState {
  icon: ICON_TYPE;
  inputType: string;
  ariaLabel: string;
}
