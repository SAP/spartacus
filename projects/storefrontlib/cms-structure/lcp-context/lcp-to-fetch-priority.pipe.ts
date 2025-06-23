import { inject, Pipe, PipeTransform } from '@angular/core';
import { ImageFetchPriority } from '@spartacus/storefront';
import { LcpContext } from './lcp-context.model';
import { LcpToFetchPriorityService } from './lcp-to-fetch-priority.service';

/**
 * Util to map the LCP context to an image fetch priority.
 */
@Pipe({
  name: 'cxLcpToFetchPriority',
  pure: true,
  standalone: false,
})
export class LcpToFetchPriorityPipe implements PipeTransform {
  service = inject(LcpToFetchPriorityService);

  /**
   * Maps the LCP context (information about the presence of the Largest Contentful Paint)
   * to an image fetch priority.
   */
  transform(lcpContext?: LcpContext | null): ImageFetchPriority | undefined {
    return this.service.map(lcpContext);
  }
}
