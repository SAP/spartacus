/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DirectionMode } from '../../../layout/direction/config/direction.model';
import { IconConfig } from './icon.model';

export const defaultIconConfig: IconConfig = {
  icon: {
    flipDirection: {
      CARET_RIGHT: DirectionMode.RTL,
      CARET_LEFT: DirectionMode.RTL,
    },
  },
};
