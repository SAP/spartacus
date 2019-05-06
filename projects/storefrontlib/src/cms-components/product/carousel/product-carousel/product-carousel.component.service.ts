import { Injectable } from '@angular/core';
import {
  CmsProductCarouselComponent,
  ProductService,
  UIProduct,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Injectable()
export class ProductCarouselService {
  private items$: Observable<Observable<UIProduct>[]>;
  private title$: Observable<string>;

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

  getItems(): Observable<Observable<UIProduct>[]> {
    return this.items$;
  }

  /**
   * Maps the item codes from CMS component to an array of `UIProduct` observables.
   */
  setItems(): void {
    this.items$ = this.component.data$.pipe(
      filter(data => data && !!data.productCodes),
      map(data => {
        const productCodes = data.productCodes.split(' ');
        return productCodes.map(code => this.productService.get(code));
      })
    );
  }
}
