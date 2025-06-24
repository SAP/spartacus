import { Injectable } from '@angular/core';
import { ImageFetchPriority } from '@spartacus/storefront';
import { LcpPresence } from './lcp-context.model';

/**
 * Maps the information about the LCP (Largest Contentful Paint) presence to the image fetch priority.
 */
@Injectable({ providedIn: 'root' })
export class LcpToFetchPriorityMappingService {
  map(lcpContext: LcpPresence): ImageFetchPriority | undefined {
    if (lcpContext === LcpPresence.CONTAINS_LCP) {
      return ImageFetchPriority.HIGH;
    }
    return undefined;
  }
}
