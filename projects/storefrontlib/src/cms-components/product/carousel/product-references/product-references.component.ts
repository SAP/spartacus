import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsProductReferencesComponent,
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent {
  private title$ = this.component.data$.pipe(map(d => d.title));

  currentProductCode$: Observable<string> = this.current.getProduct().pipe(
    filter(Boolean),
    map((p: Product) => p.code)
  );

  private items$: Observable<Observable<ProductReference>[]> = combineLatest([
    this.currentProductCode$,
    this.component.data$,
  ]).pipe(
    map(([code, data]) =>
      this.getProductReferences(code, data.productReferenceTypes)
    )
  );

  constructor(
    protected component: CmsComponentData<CmsProductReferencesComponent>,
    protected current: CurrentProductService,
    protected referenceService: ProductReferenceService
  ) {}

  /**
   * returns an Obervable string for the title
   */
  getTitle(): Observable<string> {
    return this.title$;
  }

  /**
   * Returns an Obervable with an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  getItems(): Observable<Observable<ProductReference>[]> {
    return this.items$;
  }

  private getProductReferences(
    code: string,
    referenceType: string
  ): Observable<ProductReference>[] {
    return this.referenceService
      .get(code, referenceType)
      .pipe(
        map((refs: Observable<ProductReference[]>) => refs.map(ref => of(ref)))
      );
  }
}
