import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsProductCarouselComponent,
  Product,
  ProductScope,
  ProductService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarouselComponent {
  protected readonly PRODUCT_SCOPE = ProductScope.LIST;

  protected readonly componentData$: Observable<
    CmsProductCarouselComponent
  > = this.componentData.data$.pipe(filter(Boolean));

  protected products: Map<string, Observable<Product>> = new Map();
  protected loadState: Map<string, boolean> = new Map();

  /** A unique key for the focusable group  */
  focusGroup: string;

  /**
   * returns an Observable string for the title.
   */
  title$: Observable<string> = this.componentData$.pipe(
    map((data) => data.title)
  );

  /**
   * Observable that holds an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  items$: Observable<string[]> = this.componentData$.pipe(
    tap((data) => (this.focusGroup = data.uid)),
    map((data) => data.productCodes.trim().split(' ')),
    startWith(['', '', '', ''])
  );

  constructor(
    protected componentData: CmsComponentData<CmsProductCarouselComponent>,
    protected productService: ProductService
  ) {}

  getProduct(code: string, prefetch: boolean): Observable<Product> {
    if (!this.loadState.get(code) && prefetch) {
      // we must update the
      this.products.set(
        code,
        this.productService.get(code, this.PRODUCT_SCOPE)
      );
    } else {
      this.products.set(code, this.preload(code));
    }

    return this.products.get(code);
  }

  /**
   * We prefer to preload the product, if available.
   */
  protected preload(code: string): Observable<Product> {
    return this.productService.isSuccess(code, this.PRODUCT_SCOPE).pipe(
      take(1),
      switchMap((isLoaded) => {
        if (isLoaded) {
          // update load state
          this.loadState.set(code, true);
          return this.productService
            .get(code, this.PRODUCT_SCOPE)
            .pipe(startWith(this.getMock(code)));
        } else {
          return of(this.getMock(code));
        }
      })
    );
  }

  protected getMock(code: string): Product {
    return { code };
  }

  hasProduct(product: Product): boolean {
    const { code, ...props } = product;
    return Object.keys(props).length > 0;
  }
}
