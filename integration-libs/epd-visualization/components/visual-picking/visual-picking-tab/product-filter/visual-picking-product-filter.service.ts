/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventEmitter, Injectable } from '@angular/core';
import { Product, ProductReference } from '@spartacus/core';
import { combineLatest, concat, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisualPickingProductFilterService {
  constructor() {
    // Intentional empty constructor
  }

  /**
   * The current filter value.
   * @param filter The filter value to apply.
   */
  public set filter(filterStr: string) {
    if (this._filter === filterStr) {
      return;
    }
    this._filter = filterStr;
    this.filter$.emit(filterStr);
  }
  public get filter(): string {
    return this._filter;
  }
  private _filter: string = '';
  private filter$ = new EventEmitter<string>();

  /**
   * The set of fields in product objects to perform matching against.
   */
  protected fieldsToMatch = ['code', 'name'];

  protected applyFilter(
    filterToApply: string,
    unfilteredProductReferences: ProductReference[]
  ): ProductReference[] {
    filterToApply = filterToApply.toLowerCase();
    const filteredProductReferences = unfilteredProductReferences.filter(
      (productReference) => {
        const product = productReference.target as Product;
        return this.fieldsToMatch.some((field) => {
          const fieldValue = (product as any)[field];
          return (
            fieldValue !== undefined &&
            fieldValue.toLowerCase().indexOf(filterToApply) !== -1
          );
        });
      }
    );
    return filteredProductReferences;
  }

  /**
   * Returns an Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
   * @param unfilteredProductReferences$ An Observable that returns the unfiltered ProductReference[] to apply filtering to.
   * @returns An Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
   */
  public getFilteredProducts(
    unfilteredProductReferences$: Observable<ProductReference[]>
  ): Observable<ProductReference[]> {
    return combineLatest([
      concat(of(''), this.filter$),
      unfilteredProductReferences$,
    ]).pipe(
      filter(
        ([filterStr, productReferences]) =>
          filterStr !== undefined && productReferences !== undefined
      ),
      map(([filterToApply, productReferences]) =>
        this.applyFilter(filterToApply, productReferences)
      )
    );
  }
}
