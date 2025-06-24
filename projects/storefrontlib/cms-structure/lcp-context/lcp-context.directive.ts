import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ImageFetchPriority } from '../../shared/components/media/media.model';
import { LCP_CONTEXT, LcpContext } from './lcp-context.model';
import { LcpToFetchPriorityMappingService } from './lcp-to-fetch-priority-mapping.service';

interface LcpContextDirectiveTemplateContext {
  $implicit: {
    fetchPriority$: Observable<ImageFetchPriority | null | undefined>;
    lcpContext$: Observable<LcpContext>;
  };
}

@Directive({
  selector: '[cxLcpContext]',
  standalone: false,
})
export class LcpContextDirective {
  protected readonly lcpToFetchPriorityService = inject(
    LcpToFetchPriorityMappingService
  );
  readonly lcpContext$ = inject(LCP_CONTEXT);
  readonly fetchPriority$ = this.lcpContext$.pipe(
    map((lcpContext) => this.lcpToFetchPriorityService.map(lcpContext) ?? null)
  );

  constructor(
    private templateRef: TemplateRef<LcpContextDirectiveTemplateContext>,
    private viewContainer: ViewContainerRef
  ) {
    this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: {
        fetchPriority$: this.fetchPriority$,
        lcpContext$: this.lcpContext$,
      },
    });
  }

  static ngTemplateContextGuard(
    _dir: LcpContextDirective,
    _ctx: unknown
  ): _ctx is LcpContextDirectiveTemplateContext {
    return true;
  }
}
