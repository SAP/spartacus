import { EventEmitter, Injectable } from '@angular/core';
import { Product, ProductReference } from '@spartacus/core';
import { combineLatest, Observable, of, concat } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisualPickingProductFilterService {
  constructor() {}

  /**
   * The current filter value.
   * @param filter The filter value to apply.
   */
  public set filter(filter: string) {
    if (this._filter === filter) {
      return;
    }
    this._filter = filter;
    this.filter$.emit(filter);
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

  /**
   * Returns an Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
   * @param unfilteredProductReferences$ An Observable that returns the unfiltered ProductReference[] to apply filtering to.
   * @returns An Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
   */
  public getFilteredProducts$(
    unfilteredProductReferences$: Observable<ProductReference[]>
  ): Observable<ProductReference[]> {
    return combineLatest([
      concat(of(''), this.filter$),
      unfilteredProductReferences$,
    ]).pipe(
      filter(
        (valuePair: [string, ProductReference[]]) =>
          valuePair[0] !== undefined && valuePair[1] !== undefined
      ),
      map((valuePair: [string, ProductReference[]]) => {
        const filter = valuePair[0].toLowerCase();
        const productReferences: ProductReference[] = valuePair[1];

        return productReferences.filter((productReference) => {
          const product = productReference.target as Product;
          return this.fieldsToMatch.some((field) => {
            const fieldValue = (product as any)[field];
            return (
              fieldValue !== undefined &&
              fieldValue.toLowerCase().indexOf(filter) !== -1
            );
          });
        });
      })
    );
  }
}
