import { Directive, inject, Input, OnChanges } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import {
  distinctUntilChanged,
  ReplaySubject,
  shareReplay,
  switchMap,
} from 'rxjs';
import { CmsLcpService } from '../services/cms-lcp.service';
import { LcpContext } from './lcp-context.model';
import { LCP_CONTEXT } from './lcp-context.token';
/**
 * Provides the LCP (Largest Contentful Paint) context for descendant components,
 * based on the CMS component data.
 * It uses the `CmsLcpService` to determine if a CMS component
 * contains an LCP (Largest Contentful Paint) element.
 */
@Directive({
  selector: '[cxProvideLcpContextForCms]',
  providers: [
    {
      provide: LCP_CONTEXT,
      useFactory: (): LcpContext =>
        inject(ProvideLcpContextForCmsDirective).lcpContext,
    },
  ],
  standalone: false,
})
export class ProvideLcpContextForCmsDirective implements OnChanges {
  protected cmsLcpService = inject(CmsLcpService);

  @Input() cxProvideLcpContextForCms: ContentSlotComponentData;
  protected _cmsComponentData$ = new ReplaySubject<ContentSlotComponentData>(1);

  ngOnChanges(): void {
    this._cmsComponentData$.next(this.cxProvideLcpContextForCms);
  }

  protected lcpPresence$ = this._cmsComponentData$.pipe(
    switchMap((componentData) =>
      this.cmsLcpService.getLcpPresence(componentData)
    ),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected lcpContext: LcpContext = {
    lcpPresence$: this.lcpPresence$,
  };
}
