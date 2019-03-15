import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../../occ/occ-models/occ.models';
import { OccProductConfig } from './product-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { ProductOccService } from './product-occ.service';

@Injectable()
export class OccProductService extends ProductOccService {
  constructor(
    private http: HttpClient,
    private config: OccProductConfig,
    private dynamicTemplate: DynamicTemplate
  ) {
    super(config);
  }

  protected getEndpoint(code: string): string {
    return (
      this.getProductEndpoint() +
      this.dynamicTemplate.resolve(this.config.occProduct.getProduct, {
        productCode: code
      })
    );
  }

  load(productCode: string): Observable<Product> {
    return this.http
      .get(this.getEndpoint(productCode))
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
