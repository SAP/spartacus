import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReference } from '../../../../../../../../projects/core/src/model/product.model';
import { OccEndpointsService } from '../../../../../../../../projects/core/src/occ/services/occ-endpoints.service';
import { ConverterService } from '../../../../../../../../projects/core/src/util/converter.service';
import { PRODUCT_REFERENCES_NORMALIZER } from '../../../../../../../../projects/core/src/product/connectors/references/converters';
import { ProductReferencesAdapter } from '../../../../../../../../projects/core/src/product/connectors/references/product-references.adapter';

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
    return this.occEndpoints.getUrl(
      'productReferences',
      {
        productCode: code,
      },
      { referenceType: reference, pageSize }
    );
  }
}
