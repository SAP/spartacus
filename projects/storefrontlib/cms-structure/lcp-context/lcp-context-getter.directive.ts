import { Directive, inject } from '@angular/core';
import { map } from 'rxjs';
import { LCP_CONTEXT } from './lcp-context.model';
import { LcpToFetchPriorityService } from './lcp-to-fetch-priority.service';

@Directive({
  selector: '[cxLcpContextGetter]',
  exportAs: 'cxLcpContextGetter',
  standalone: false,
})
export class GetLcpContextDirective {
  protected readonly lcpToFetchPriorityService = inject(
    LcpToFetchPriorityService
  );

  readonly lcpContext$ = inject(LCP_CONTEXT);
  readonly fetchPriority$ = this.lcpContext$.pipe(
    map((lcpContext) => this.lcpToFetchPriorityService.map(lcpContext))
  );
}
