/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Provider } from '@angular/core';
import { CmsBannerComponent } from '@spartacus/core';
import { BannerComponentService } from '@spartacus/storefront';

/**
 * Marks certain banners as LCP (Largest Contentful Paint), making them
 * fetched with high priority.
 *
 * (yes it's a workaround! ideally such information should not be hardcoded in Spartacus
 * by "component name" but rather defined in CMS!)
 */
@Injectable({ providedIn: 'root' })
export class CustomBannerComponentService extends BannerComponentService {
  override getImageFetchPriority(
    data: CmsBannerComponent
  ): 'low' | 'auto' | 'high' | undefined {
    const LCP_BANNER_NAMES = ['Electronics Homepage Splash Banner Component'];

    if (data.name && LCP_BANNER_NAMES.includes(data.name)) {
      return 'high';
    }

    return super.getImageFetchPriority(data);
  }
}

export const workaroundMarkCertainBannersAsLcp: Provider = {
  provide: BannerComponentService,
  useExisting: CustomBannerComponentService,
};
