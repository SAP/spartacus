import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { PRODUCT_REFERENCES_NORMALIZER } from '../../../product/connectors/references/converters';
import { ProductReferencesAdapter } from '../../../product/connectors/references/product-references.adapter';

@Injectable()
export class OccProductReferencesAdapter implements ProductReferencesAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): Observable<ProductReference[]> {
    return this.http
      .get(this.getEndpoint(productCode, referenceType, pageSize))
      .pipe(this.converter.pipeable(PRODUCT_REFERENCES_NORMALIZER));
  }

  protected getEndpoint(
    code: string,
    reference?: string,
    pageSize?: number
  ): string {
    return this.occEndpoints.buildUrl('productReferences', {
      urlParams: { productCode: code },
      queryParams: { referenceType: reference, pageSize },
    });
  }
}
