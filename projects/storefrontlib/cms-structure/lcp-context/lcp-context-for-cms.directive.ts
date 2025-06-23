import { Directive, inject, Input } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { distinctUntilChanged, map, ReplaySubject } from 'rxjs';
import { LcpContextForCmsService } from './lcp-context-for-cms.service';
import { LCP_CONTEXT } from './lcp-context.model';

/**
 * Provides LCP context for child components based on the CMS component data.
 * It uses the `LcpContextForCmsService` to determine if a CMS component
 * contains an LCP (Largest Contentful Paint) element.
 */
@Directive({
  selector: '[cxLcpContextForCms]',
  providers: [
    {
      provide: LCP_CONTEXT,
      useFactory: () => inject(LcpContextForCmsDirective).value$,
    },
  ],
  standalone: false,
})
export class LcpContextForCmsDirective {
  @Input() cxCmsLcpContext: ContentSlotComponentData;

  protected lcpContextForCmsService = inject(LcpContextForCmsService);

  protected _input$ = new ReplaySubject<ContentSlotComponentData>(1);

  protected _value$ = this._input$.pipe(
    map((cmsComponentData) =>
      this.lcpContextForCmsService.get(cmsComponentData)
    )
  );

  protected readonly value$ = this._value$.pipe(distinctUntilChanged());
}
