import { Directive, inject } from '@angular/core';
import { map } from 'rxjs';
import { LCP_CONTEXT } from './lcp-context.model';
import { LcpToFetchPriorityService } from './lcp-to-fetch-priority.service';

@Directive({
  selector: '[cxGetLcpContext]',
  standalone: false,
  exportAs: 'lcpContext',
})
export class GetLcpContextDirective {
  protected lcpToFetchPriorityService = inject(LcpToFetchPriorityService);

  protected lcpContext$ = inject(LCP_CONTEXT);
  protected fetchPriority$ = this.lcpContext$.pipe(
    map((lcpContext) => this.lcpToFetchPriorityService.map(lcpContext))
  );
}
