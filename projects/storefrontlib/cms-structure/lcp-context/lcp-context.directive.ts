import { Directive, inject } from '@angular/core';
import { map } from 'rxjs';
import { LCP_CONTEXT } from './lcp-context.model';
import { LcpToFetchPriorityMappingService } from './lcp-to-fetch-priority-mapping.service';

@Directive({
  selector: '[cxLcpContext]',
  exportAs: 'cxLcpContext',
  standalone: false,
})
export class LcpContextDirective {
  protected readonly lcpToFetchPriorityService = inject(
    LcpToFetchPriorityMappingService
  );

  readonly lcpContext$ = inject(LCP_CONTEXT);
  readonly fetchPriority$ = this.lcpContext$.pipe(
    map((lcpContext) => this.lcpToFetchPriorityService.map(lcpContext))
  );
}
