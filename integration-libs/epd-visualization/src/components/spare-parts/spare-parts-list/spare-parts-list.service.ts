import { Injectable } from '@angular/core';
import {
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { combineLatest, concat, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SparePartListItem } from './model/spare-part-list.model';

const productReferenceType = 'SPAREPART';

@Injectable({
  providedIn: 'any',
})
export class SparePartsListService {
  constructor(
    protected currentProductService: CurrentProductService,
    protected productReferenceService: ProductReferenceService
  ) {}

  public getCurrentProductCode$(): Observable<string> {
    return this.currentProductService.getProduct().pipe(
      filter((p: Product | null) => !!p && !!p.code),
      map((p: Product | null) => p?.code as string),
      distinctUntilChanged(),
      tap(() => this.productReferenceService.cleanReferences())
    );
  }

  public getProductReferences$(
    currentProductCode$: Observable<string>
  ): Observable<ProductReference[]> {
    return currentProductCode$.pipe(
      tap((productCode) =>
        this.productReferenceService.loadProductReferences(
          productCode,
          productReferenceType
        )
      ),
      switchMap((code) =>
        this.productReferenceService.getProductReferences(
          code,
          productReferenceType
        )
      )
    );
  }

  public getSparePartItems$(
    productReferences$: Observable<ProductReference[]>,
    selectedProductCodes$: Observable<string[]>
  ): Observable<SparePartListItem[]> {
    return combineLatest([
      productReferences$,
      concat(of([] as string[]), selectedProductCodes$),
    ]).pipe(
      filter((valuePair) => !!valuePair[0] && !!valuePair[1]),
      map((valuePair) => {
        const productReferences = valuePair[0];
        const highlightedProductCodes = valuePair[1];

        return productReferences
          .filter(
            (productReference) =>
              !!productReference.target && !!productReference.target.code
          )
          .map((productReference) => {
            const product = productReference.target as Product;
            const productCode = product.code as string;
            const highlighted =
              highlightedProductCodes.indexOf(productCode) !== -1;
            return {
              product,
              highlighted,
            };
          });
      })
    );
  }
}
