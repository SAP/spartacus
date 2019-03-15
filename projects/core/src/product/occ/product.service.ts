import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../../occ/occ-models/occ.models';
import { OccProductConfig } from './product-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';

@Injectable()
export class OccProductService {
  constructor(
    private http: HttpClient,
    private config: OccProductConfig,
    private dynamicTemplate: DynamicTemplate
  ) {}

  private getProductEndpoint(): string {
    return (
      (this.config.occProduct.baseUrl || (this.config.server.baseUrl || '')) +
      (this.config.occProduct.occPrefix || this.config.server.occPrefix) +
      (this.config.occProduct.baseSite || this.config.site.baseSite) +
      '/'
    );
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
