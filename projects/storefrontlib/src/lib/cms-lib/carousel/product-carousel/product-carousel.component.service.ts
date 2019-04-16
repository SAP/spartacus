import { Injectable } from '@angular/core';
import {
  CmsProductCarouselComponent,
  Product,
  ProductService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Injectable()
export class ProductCarouselService {
  private items$: Observable<Observable<Product>[]>;
  private title$: Observable<string>;
  MAX_WIDTH = 360;
  MAX_ITEM_SIZE = 4;
  SPEED = 250;

  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    private productService: ProductService
  ) {}

  getTitle(): Observable<string> {
    return this.title$;
  }

  setTitle(): void {
    this.title$ = this.component.data$.pipe(
      map(data => {
        return data.title;
      })
    );
  }

  getItems(): Observable<Observable<Product>[]> {
    return this.items$;
  }

  /**
   * Maps the item codes from CMS component to an array of `Product` observables.
   */
  setItems(): void {
    this.items$ = this.component.data$.pipe(
      map(data => {
        const productCodes = data.productCodes.split(' ');
        return productCodes.map(code => this.productService.get(code));
      })
    );
  }
}
