/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsLinkComponent } from '../../model/cms.model';

export interface NodeItem {
  [id_type: string]: CmsLinkComponent;
}
