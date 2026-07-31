/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { catchError, combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OutletContextData, SearchBoxComponentService } from '@spartacus/storefront';
import {
  AiProductCriteria,
  AiProductCriteriaService,
} from './ai-product-criteria.service';

@Component({
  selector: 'cx-ai-product-criteria',
  templateUrl: './ai-product-criteria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AiProductCriteriaComponent implements OnInit {
  protected outletContext = inject(OutletContextData, {
    optional: true,
  }) as OutletContextData | null;
  protected criteriaService = inject(AiProductCriteriaService);
  protected searchBoxService = inject(SearchBoxComponentService);

  criteria$: Observable<AiProductCriteria | null> = of(null);
  private static idCounter = 0;
  readonly tooltipId = `cx-ai-criteria-tooltip-${++AiProductCriteriaComponent.idCounter}`;

  ngOnInit(): void {
    const ctx = this.outletContext?.context;
    const product = ctx?.product;

    this.criteria$ = combineLatest([
      this.searchBoxService.lastSearchWasAi$,
      this.searchBoxService.lastAiQuery$,
    ]).pipe(
      switchMap(([lastSearchWasAi, query]) => {
        if (!lastSearchWasAi || !product?.code) return of(null);
        return this.criteriaService
          .getCriteria(product.code, query)
          .pipe(catchError(() => of(null)));
      })
    );
  }

  isFullMatch(criteria: AiProductCriteria): boolean {
    return criteria.matchedCount === criteria.totalCount;
  }
}
