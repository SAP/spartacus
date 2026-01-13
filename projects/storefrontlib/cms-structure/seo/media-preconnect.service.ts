/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { PageMetaLinkService } from './page-meta-link.service';
import { WindowRef, FeatureToggles } from '@spartacus/core';
import { MediaService } from '../../shared/components/media/media.service';

@Injectable({
  providedIn: 'root',
})
export class MediaPreconnectService {
  protected pageMetaLinkService = inject(PageMetaLinkService);
  protected mediaService = inject(MediaService);
  private featureToggles = inject(FeatureToggles);
  protected windowRef = inject(WindowRef);

  addPreconnectLink(): void {
    if (!this.featureToggles.createMediaPreconnectLink) {
      return;
    }

    const url = this.mediaService.getBaseUrl();
    let domain: string | undefined;
    try {
      domain = new URL(url).origin;
    } catch {
      domain = undefined;
    }

    // Preconnecting is not needed (and won't be performed) if the domain of the media base url
    // is the same as the storefront's domain
    if (domain && domain !== this.windowRef.location.origin) {
      this.pageMetaLinkService.addPreconnectLink(url);
    }
  }
}
