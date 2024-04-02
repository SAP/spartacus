/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsComponent } from '@spartacus/core';

export interface CmsMerchandisingCarouselComponent extends CmsComponent {
  title?: string;
  strategy?: string;
  numberToDisplay?: number;
  scroll?: string;
  container?: string;
  textColour?: string;
  backgroundColour?: string;
  viewportPercentage?: number;
}
