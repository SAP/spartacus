import { Injectable } from '@angular/core';
import {
  CmsProductReferencesComponent,
  ProductReferenceService,
  RoutingService,
  UIProductReference,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Injectable()
export class ProductReferencesService {
  private title$: Observable<string>;
  private items$: Observable<UIProductReference[]>;

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

  getReferenceType(): Observable<string> {
    return this.component.data$.pipe(map(data => data.productReferenceTypes));
  }

  getProductCode(): Observable<string> {
    return this.routerService
      .getRouterState()
      .pipe(map(data => data.state.params.productCode));
  }

  getReferenceList(): Observable<UIProductReference[]> {
    return this.items$;
  }

  setReferenceList(pageSize?: number): void {
    this.items$ = combineLatest(
      this.getProductCode(),
      this.getReferenceType()
    ).pipe(
      map(data => ({ productCode: data[0], referenceType: data[1] })),
      switchMap(data => {
        return this.referenceService.get(
          data.productCode,
          data.referenceType,
          pageSize
        );
      })
    );
  }
}
