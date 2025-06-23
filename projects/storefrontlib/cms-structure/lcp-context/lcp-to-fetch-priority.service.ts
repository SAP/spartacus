import { Injectable } from '@angular/core';
import { ImageFetchPriority } from '@spartacus/storefront';
import { LcpContext } from './lcp-context.model';

/**
 * Easy extension point for the LcpToFetchPriorityPipe.
 *
 * It's provided in the root injector, so can be easily overwritten,
 * as opposed to the pipe.
 */
@Injectable({ providedIn: 'root' })
export class LcpToFetchPriorityService {
  map(lcpContext: LcpContext): ImageFetchPriority | undefined {
    if (lcpContext === LcpContext.CONTAINS_LCP) {
      return ImageFetchPriority.HIGH;
    }
    return undefined;
  }
}
