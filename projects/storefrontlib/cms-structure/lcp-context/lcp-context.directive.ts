import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ImageFetchPriority } from '../../shared/components/media/media.model';
import { LCP_CONTEXT, LcpElementInfo } from './lcp-context.model';
import { LcpToFetchPriorityMappingService } from './lcp-to-fetch-priority-mapping.service';

interface LcpContextDirectiveTemplateContext {
  $implicit: {
    lcpElementInfo$: Observable<LcpElementInfo>;
    lcpFetchPriority$: Observable<ImageFetchPriority | null | undefined>;
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
  readonly lcpContext = inject(LCP_CONTEXT);
  readonly fetchPriority$ = this.lcpContext.lcpElementInfo$.pipe(
    map(
      (lcpElementInfo) =>
        this.lcpToFetchPriorityService.map(lcpElementInfo) ?? null
    )
  );

  constructor(
    private templateRef: TemplateRef<LcpContextDirectiveTemplateContext>,
    private viewContainer: ViewContainerRef
  ) {
    this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: {
        lcpFetchPriority$: this.fetchPriority$,
        lcpElementInfo$: this.lcpContext.lcpElementInfo$,
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
