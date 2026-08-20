/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { catchError, combineLatest, defer, Observable, of, switchMap } from 'rxjs';
import { OutletContextData, SearchBoxComponentService } from '@spartacus/storefront';
import {
  AiProductCriteria,
  AiProductCriteriaService,
} from './ai-product-criteria.service';
import { AiSearchBackendService } from './ai-search-backend.service';

@Component({
  selector: 'cx-ai-product-criteria',
  templateUrl: './ai-product-criteria.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class AiProductCriteriaComponent {
  protected outletContext = inject(OutletContextData, {
    optional: true,
  }) as OutletContextData | null;
  protected criteriaService = inject(AiProductCriteriaService);
  protected searchBoxService = inject(SearchBoxComponentService);
  private readonly backendService = inject(AiSearchBackendService);

  private static idCounter = 0;
  readonly tooltipId = `cx-ai-criteria-tooltip-${++AiProductCriteriaComponent.idCounter}`;

  readonly criteria$: Observable<AiProductCriteria | null> = defer(() => {
    this.searchBoxService.restoreAiContextFromStorage();
    const product = this.outletContext?.context?.product;
    return combineLatest([
      this.searchBoxService.lastSearchWasAi$,
      this.backendService.isSearching$,
    ]).pipe(
      switchMap(([lastSearchWasAi, isSearching]) => {
        if (!lastSearchWasAi || isSearching || !product?.code) return of(null);
        return this.criteriaService.getCriteria(product.code, '').pipe(
          catchError(() => of(null))
        );
      })
    );
  });

  isFullMatch(criteria: AiProductCriteria): boolean {
    return criteria.matchedCount === criteria.totalCount;
  }
}
