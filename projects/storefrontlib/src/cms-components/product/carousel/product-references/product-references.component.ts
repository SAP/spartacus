import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsProductReferencesComponent,
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent {
  private get componentData$(): Observable<CmsProductReferencesComponent> {
    return this.component.data$.pipe(filter(Boolean));
  }

  protected get productCode$(): Observable<string> {
    return this.currentProductService.getProduct().pipe(
      filter(Boolean),
      map((product: Product) => product.code),
      tap((_) => this.productReferenceService.cleanReferences())
    );
  }

  /**
   * returns an Obervable string for the title
   */
  get title$(): Observable<string> {
    return this.componentData$.pipe(map((data) => data?.title));
  }

  /**
   * Observable with an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  items$: Observable<Observable<Product>[]> = this.productCode$.pipe(
    withLatestFrom(this.componentData$),
    tap(([productCode, data]) =>
      this.productReferenceService.loadProductReferences(
        productCode,
        data?.productReferenceTypes
      )
    ),
    switchMap(([productCode, data]) =>
      this.getProductReferences(productCode, data?.productReferenceTypes)
    )
  );

  constructor(
    protected component: CmsComponentData<CmsProductReferencesComponent>,
    protected currentProductService: CurrentProductService,
    protected productReferenceService: ProductReferenceService
  ) {}

  private getProductReferences(
    code: string,
    referenceType: string
  ): Observable<Observable<Product>[]> {
    return this.productReferenceService
      .getProductReferences(code, referenceType)
      .pipe(
        filter(Boolean),
        map((references: ProductReference[]) =>
          references.map((reference) => of(reference.target))
        )
      );
  }
}
