/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CmsStructureModel } from '../../model/page.model';

export const CMS_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CmsStructureModel>
>('CmsPageNormalizer');
