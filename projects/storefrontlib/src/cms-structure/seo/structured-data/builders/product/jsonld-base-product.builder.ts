import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { JsonLdBuilder } from '../schema.interface';

/**
 * Builds the basic structured data for the product, see https://schema.org/product.
 * This builder includes data for sku number, name, description, brand and main image.
 */
@Injectable({
  providedIn: 'root',
})
export class JsonLdBaseProductBuilder implements JsonLdBuilder<Product> {
  build(product: Product): Observable<any> {
    return of({
      ...this.getProductBase(product),
      ...this.getProductBrand(product),
      ...this.getProductImage(product),
    });
  }

  private getProductBase(product: Product) {
    const result: any = { sku: product.code };
    if (product.name) {
      result.name = product.name;
    }
    if (product.summary) {
      result.description = product.summary;
    }
    return result;
  }

  private getProductImage(product: Product) {
    return product.images &&
      product.images.PRIMARY &&
      product.images.PRIMARY['zoom'] &&
      product.images.PRIMARY['zoom'].url
      ? {
          image: product.images.PRIMARY['zoom'].url,
        }
      : {};
  }

  private getProductBrand(product: Product) {
    return product['manufacturer']
      ? {
          brand: product['manufacturer'],
        }
      : null;
  }
}
