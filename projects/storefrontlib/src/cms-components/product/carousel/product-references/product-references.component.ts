import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsProductReferencesComponent,
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  tap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent {
  /**
   * returns an Obervable string for the title
   */
  title$ = this.component.data$.pipe(map((d) => d?.title));

  private currentProductCode$: Observable<
    string
  > = this.current.getProduct().pipe(
    filter(Boolean),
    map((p: Product) => p.code),
    distinctUntilChanged(),
    tap(() => this.referenceService.cleanReferences())
  );

  /**
   * Obervable with an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  items$: Observable<Observable<Product>[]> = combineLatest([
    this.currentProductCode$,
    this.component.data$,
  ]).pipe(
    switchMap(([code, data]) =>
      this.getProductReferences(code, data?.productReferenceTypes)
    )
  );

  constructor(
    protected component: CmsComponentData<CmsProductReferencesComponent>,
    protected current: CurrentProductService,
    protected referenceService: ProductReferenceService
  ) {}

  private getProductReferences(
    code: string,
    referenceType: string
  ): Observable<Observable<Product>[]> {
    return this.referenceService.get(code, referenceType).pipe(
      filter(Boolean),
      map((refs: ProductReference[]) => refs.map((ref) => of(ref.target)))
    );
  }
}
