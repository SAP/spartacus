import { Injectable } from '@angular/core';
import { ProductAdapter } from '../../../product/connectors/product/product.adapter';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { Product } from '../../../model/product.model';
import { ScopedProductData } from '../../../product/connectors/product/scoped-product-data';
import {
  OccFieldsModels,
  OccFieldsService,
} from '../../services/occ-fields.service';
import { Occ } from '../../occ-models';

@Injectable()
export class OccProductAdapter implements ProductAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected occFields: OccFieldsService
  ) {}

  load(productCode: string, scope?: string): Observable<Product> {
    return this.http
      .get(this.getEndpoint(productCode, scope))
      .pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }

  loadMany(products: ScopedProductData[]): ScopedProductData[] {
    const oddFieldsModels: OccFieldsModels[] = products.map(model => ({
      model,
      url: this.getEndpoint(model.id, model.scope),
    }));

    return this.occFields
      .optimalLoad<Occ.Product>(oddFieldsModels)
      .map(scopedProduct => ({
        ...scopedProduct,
        data$: scopedProduct.data$.pipe(
          this.converter.pipeable(PRODUCT_NORMALIZER)
        ),
      }));
  }

  protected getEndpoint(code: string, scope: string): string {
    return this.occEndpoints.getUrl(
      'product',
      {
        productCode: code,
      },
      undefined,
      scope
    );
  }
}
