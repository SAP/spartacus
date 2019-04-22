import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ProductReference } from '../../occ/occ-models/occ.models';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { ConverterService } from '../../util/converter.service';
import { PRODUCT_REFERENCES_NORMALIZER } from '../connectors/references/converters';
import { ProductReferencesAdapter } from '../connectors/references/product-references.adapter';

@Injectable()
export class OccProductReferencesAdapter implements ProductReferencesAdapter {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): Observable<ProductReference[]> {
    return this.http
      .get(this.getEndpoint(productCode, referenceType, pageSize))
      .pipe(
        pluck('references'),
        this.converter.pipeable(PRODUCT_REFERENCES_NORMALIZER)
      );
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
