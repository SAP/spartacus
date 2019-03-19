import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../../occ/occ-models/occ.models';
import { OccProductConfig } from '../config/product-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';
import { ProductOccService } from './product-occ.service';

@Injectable()
export class ProductLoaderService extends ProductOccService {
  constructor(private http: HttpClient, private config: OccProductConfig) {
    super(config);
  }

  load(productCode: string): Observable<Product> {
    return this.http
      .get(this.getEndpoint(productCode))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getEndpoint(code: string): string {
    return (
      this.getProductEndpoint() +
      DynamicTemplate.resolve(this.config.endpoints.product, {
        productCode: code
      })
    );
  }
}
