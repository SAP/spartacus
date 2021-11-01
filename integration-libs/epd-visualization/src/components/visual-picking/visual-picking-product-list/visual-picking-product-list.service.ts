import { EventEmitter, Injectable } from '@angular/core';
import {
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import { VisualPickingProductFilterService } from '../visual-picking-product-filter/visual-picking-product-filter.service';
import {
  EpdVisualizationConfig,
  VisualPickingConfig,
} from '../../../config/epd-visualization-config';

@Injectable({
  providedIn: 'any',
})
export class VisualPickingProductListService {
  constructor(
    protected currentProductService: CurrentProductService,
    protected productReferenceService: ProductReferenceService,
    protected visualPickingProductFilterService: VisualPickingProductFilterService,
    protected epdVisualizationConfig: EpdVisualizationConfig
  ) {}

  protected readonly DEFAULT_ITEMS_PER_SLIDE = 7;

  /**
   * Initializes the service.
   */
  public initialize(): void {
    this.filteredItems$.subscribe((items) => {
      const firstHighlightedItemIndex = items.findIndex(
        (item) => item.highlighted
      );
      if (firstHighlightedItemIndex !== -1) {
        this.activeSlideStartIndex =
          firstHighlightedItemIndex -
          (firstHighlightedItemIndex % this.itemsPerSlide);
      }
    });

    this.selectedProductCodes = [];
  }

  private productReferenceType = (
    this.epdVisualizationConfig.visualPicking as VisualPickingConfig
  ).productReferenceType as string;

  /**
   * Returns an Observable that produces the spare part product references for the current product.
   * @returns An Observable that produces the spare part product references for the current product.
   */
  public getCurrentProductReferences$(): Observable<ProductReference[]> {
    return this.currentProductService.getProduct().pipe(
      filter((product) => !!product && !!product.code),
      tap((product) =>
        this.productReferenceService.loadProductReferences(
          (product as Product).code as string,
          this.productReferenceType
        )
      ),
      switchMap((product) =>
        this.productReferenceService.getProductReferences(
          (product as Product).code as string,
          this.productReferenceType
        )
      ),
      shareReplay()
    );
  }

  /**
   * Returns an Observable that produces a filtered array of spare part product references for the current product.
   * Filtering is performed by the VisualPickingProductFilterService.
   * @returns An Observable that produces a filtered array of spare part product references for the current product.
   */
  public getFilteredProductReferences$(): Observable<ProductReference[]> {
    return this.visualPickingProductFilterService
      .getFilteredProducts$(this.getCurrentProductReferences$())
      .pipe(shareReplay());
  }

  activeSlideStartIndex = 0;
  itemsPerSlide = this.DEFAULT_ITEMS_PER_SLIDE;

  set selectedProductCodes(selectedProductCodes: string[]) {
    this._selectedProductCodes = selectedProductCodes;
    this.selectedProductCodesChange.next(selectedProductCodes);
  }
  get selectedProductCodes(): string[] {
    return this._selectedProductCodes;
  }
  _selectedProductCodes: string[];
  selectedProductCodesChange = new EventEmitter<string[]>();

  /**
   * Used to create the list item model data for the visual picking product list.
   * Returns an observable containing an array of VisualPickingProductListItem objects created by combining the latest values from
   * an Observable producing an array of product references and
   * an Observable producing an array of selected product codes.
   * The VisualPickingProductListItem model object combines a ProductReference for a spare part and the selected/highlighted state of the list item.
   * @param productReferences$ An Observable producing the array of ProductReference values to map.
   * @param selectedProductCodes$ An Observable producing the array of selected product codes.
   * @returns An Observable producing an array of VisualPickingProductListItem values.
   */
  public getVisualPickingProductListItems$(
    productReferences$: Observable<ProductReference[]>,
    selectedProductCodes$: Observable<string[]>
  ): Observable<VisualPickingProductListItem[]> {
    return combineLatest([productReferences$, selectedProductCodes$]).pipe(
      filter((valuePair) => !!valuePair[0] && !!valuePair[1]),
      map((valuePair: [ProductReference[], string[]]) => {
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

  filteredItems$: Observable<VisualPickingProductListItem[]> =
    this.getVisualPickingProductListItems$(
      this.getFilteredProductReferences$(),
      this.selectedProductCodesChange
    ).pipe(shareReplay());
}
