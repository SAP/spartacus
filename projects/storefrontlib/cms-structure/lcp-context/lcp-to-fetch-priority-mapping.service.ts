import { Injectable } from '@angular/core';
import { ImageFetchPriority } from '@spartacus/storefront';
import { LcpElementInfo } from './lcp-context.model';

/**
 * Easy extension point for the mapping the LCP context to the
 * image fetch priority.
 *
 * It's provided in the root injector, so can be easily overwritten,
 * as opposed to the directive.
 */
@Injectable({ providedIn: 'root' })
export class LcpToFetchPriorityMappingService {
  map(lcpContext: LcpElementInfo): ImageFetchPriority | undefined {
    if (lcpContext === LcpElementInfo.CONTAINS_LCP) {
      return ImageFetchPriority.HIGH;
    }
    return undefined;
  }
}
