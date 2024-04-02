/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContentSlotComponentData } from './content-slot-component-data.model';

export interface ContentSlotData {
  components?: ContentSlotComponentData[];
  properties?: any;
}
