/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ImageFetchPriority } from '../components/media/media.model';
import { LcpPresence } from './lcp-presence.model';

/**
 * Maps the information about the LCP (Largest Contentful Paint) presence to fetch priority.
 */
@Injectable({ providedIn: 'root' })
export class LcpPresenceMappingService {
  getFetchPriority(lcpContext: LcpPresence): ImageFetchPriority | undefined {
    if (lcpContext === LcpPresence.HAS_LCP) {
      return ImageFetchPriority.HIGH;
    }
    return undefined;
  }
}
