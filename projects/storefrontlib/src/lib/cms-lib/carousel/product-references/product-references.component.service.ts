import { Injectable } from '@angular/core';
import { CmsProductReferencesComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Injectable()
export class ProductReferencesService {
  private title$: Observable<string>;
  private productReferenceTypes$: Observable<string>;

  constructor(
    protected component: CmsComponentData<CmsProductReferencesComponent>
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
        console.log(data);
        return data.productReferenceTypes;
      })
    );
  }
}
