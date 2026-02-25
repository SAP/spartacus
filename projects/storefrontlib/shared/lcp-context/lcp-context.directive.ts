/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { ImageFetchPriority } from '../components/media/media.model';
import { LcpPresenceMappingService } from './lcp-presence-mapping.service';
import { LcpPresence } from './lcp-presence.model';
import { LCP_PRESENCE } from './lcp-presence.token';

/**
 * Context provided by the `*cxLcpContext` directive.
 */
interface LcpContextDirectiveTemplateContext {
  $implicit: {
    lcpPresence$: Observable<LcpPresence>;
    fetchPriority$: Observable<ImageFetchPriority | null | undefined>;
  };
}

/**
 * Directive that allows reading the LCP (Largest Contentful Paint) context
 * provided via the `LCP_PRESENCE` injection token by the ancestor component.
 *
 * The knowledge about the containing the LCP (Largest Contentful Paint) element
 * can be used for performance optimizations in some descendant component.
 *
 * @usage
 * ```html
 * <ng-container *cxLcpContext="let lcpContext">
 *   LCP Presence: {{ lcpContext.lcpPresence$ }}
 *
 *   <cx-media [fetchPriority]="lcpContext.fetchPriority$ | async">
 * </ng-container>
 */
@Directive({ selector: '[cxLcpContext]' })
export class LcpContextDirective implements OnInit {
  protected readonly lcpPresence$ = inject(LCP_PRESENCE);
  protected readonly lcpPresenceMappingService = inject(
    LcpPresenceMappingService
  );

  /**
   * Convenience observable that maps the LCP presence to the fetch priority
   * for the image element, which can be used directly e.g. in the `<cx-media>` component.
   */
  protected readonly fetchPriority$ = this.lcpPresence$.pipe(
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
        lcpPresence$: this.lcpPresence$,
        fetchPriority$: this.fetchPriority$,
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
