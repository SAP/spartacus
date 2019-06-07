import { Injectable } from '@angular/core';
import {
  Product,
  ProductReferenceService,
  ProductService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CarouselItem } from '../../../shared/components/carousel/carousel.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCarouselService {
  constructor(
    protected productService: ProductService,
    protected referenceService: ProductReferenceService,
    protected semanticPathService: SemanticPathService
  ) {}

  /**
   * Loads the product data and converts it `CarouselItem`.
   */
  loadProduct(code: string): Observable<CarouselItem> {
    return this.productService.get(code).pipe(
      filter(Boolean),
      map(product => this.convertProduct(product))
    );
  }

  getProductReferences(
    code: string,
    referenceType: string,
    displayTitle: boolean,
    displayProductPrices: boolean
  ): Observable<CarouselItem[]> {
    return this.referenceService.get(code, referenceType).pipe(
      filter(Boolean),
      map(refs =>
        refs.map(ref =>
          this.convertProduct(ref.target, displayTitle, displayProductPrices)
        )
      )
    );
  }

  /**
   * Converts the product to a generic CarouselItem
   */
  private convertProduct(
    source: Product,
    displayTitle = true,
    displayProductPrices = true
  ): CarouselItem {
    const item: CarouselItem = {};
    if (displayTitle) {
      item.title = source.name;
    }
    if (displayProductPrices && source.price && source.price.formattedValue) {
      item.price = source.price.formattedValue;
    }
    if (source.images && source.images.PRIMARY) {
      item.media = {
        container: source.images.PRIMARY,
        format: 'product',
      };
    }
    item.route = this.semanticPathService.transform({
      cxRoute: 'product',
      params: source,
    });
    return item;
  }
}
