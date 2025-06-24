import {
  Directive,
  inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { ImageFetchPriority } from '../../shared/components/media/media.model';
import { LcpPresence } from './lcp-context.model';
import { LCP_CONTEXT } from './lcp-context.token';
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
export class LcpContextDirective implements OnInit {
  protected readonly lcpContext = inject(LCP_CONTEXT);
  protected readonly lcpPresenceMappingService = inject(
    LcpPresenceMappingService
  );
  protected readonly fetchPriority$ = this.lcpContext.lcpPresence$.pipe(
    map((lcpElementInfo) =>
      this.lcpPresenceMappingService.getFetchPriority(lcpElementInfo)
    ),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected templateRef = inject(
    TemplateRef<LcpContextDirectiveTemplateContext>
  );
  protected viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
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
