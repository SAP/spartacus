/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ValueProvider } from '@angular/core';
import { provideCmsStructure } from '../../cms-structure/utils/cms-structure.util';

export const defaultCmsContentProviders: ValueProvider[] = [
  provideCmsStructure({
    componentId: 'HamburgerMenuComponent',
    pageSlotPosition: 'PreHeader',
  }),
  provideCmsStructure({
    componentId: 'LoginComponent',
    pageSlotPosition: 'SiteLogin',
  }),
];
