import { Injectable } from '@angular/core';
import {
  CmsProductReferencesComponent,
  ProductReference,
  ProductReferenceService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Injectable()
export class ProductReferencesService {
  private title$: Observable<string>;
  private items$: Observable<ProductReference[]>;
  private productReferenceTypes$: Observable<string>;

  constructor(
    protected component: CmsComponentData<CmsProductReferencesComponent>,
    private referenceService: ProductReferenceService,
    private routerService: RoutingService
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

  getProductReferenceTypes(): Observable<string> {
    return this.productReferenceTypes$;
  }

  setProductReferenceTypes(): void {
    this.productReferenceTypes$ = this.component.data$.pipe(
      map(data => {
        return data.productReferenceTypes;
      })
    );
  }

  getList(): Observable<ProductReference[]> {
    return this.items$;
  }

  setReferenceList(referenceType?: string, pageSize?: number): void {
    this.items$ = this.routerService.getRouterState().pipe(
      map(data => data.state.params.productCode),
      switchMap((productCode: string) => {
        return this.referenceService.get(productCode, referenceType, pageSize);
      })
    );
  }
}
