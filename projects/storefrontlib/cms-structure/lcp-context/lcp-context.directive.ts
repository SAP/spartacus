import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { ImageFetchPriority } from '../../shared/components/media/media.model';
import { LCP_CONTEXT, LcpPresence } from './lcp-context.model';
import { LcpPresenceMappingService } from './lcp-presence-mapping.service';

interface LcpContextDirectiveTemplateContext {
  $implicit: {
    lcpPresence$: Observable<LcpPresence>;
    lcpFetchPriority$: Observable<ImageFetchPriority | null | undefined>;
  };
}

@Directive({
  selector: '[cxLcpContext]',
  standalone: false,
})
export class LcpContextDirective {
  protected readonly lcpPresenceMappingService = inject(
    LcpPresenceMappingService
  );
  readonly lcpContext = inject(LCP_CONTEXT);
  readonly fetchPriority$ = this.lcpContext.lcpPresence$.pipe(
    map(
      (lcpElementInfo) =>
        this.lcpPresenceMappingService.getFetchPriority(lcpElementInfo) ?? null
    ),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private templateRef: TemplateRef<LcpContextDirectiveTemplateContext>,
    private viewContainer: ViewContainerRef
  ) {
    this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: {
        lcpPresence$: this.lcpContext.lcpPresence$,
        lcpFetchPriority$: this.fetchPriority$,
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
