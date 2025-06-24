import { Injectable } from '@angular/core';
import { ImageFetchPriority } from '@spartacus/storefront';
import { LcpPresence } from './lcp-context.model';

/**
 * Easy extension point for the mapping the LCP context to the
 * image fetch priority.
 *
 * It's provided in the root injector, so can be easily overwritten,
 * as opposed to the directive.
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
