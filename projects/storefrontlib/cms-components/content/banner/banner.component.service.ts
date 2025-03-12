/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CmsBannerComponent } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class BannerComponentService {
  getImageFetchPriority(
    _data: CmsBannerComponent
  ): 'low' | 'auto' | 'high' | undefined {
    return undefined;
  }
}
