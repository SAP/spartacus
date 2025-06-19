/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  private windowRef = inject(WindowRef);

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

    if (domain && domain !== this.windowRef.location.origin) {
      this.pageMetaLinkService.addPreconnectLink(url);
    }
  }
}
