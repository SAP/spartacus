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

  /**
   * Returns the product sku, name and description.
   */
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

  /**
   * Returns the image object with the main product image url.
   *
   * If the image is not available, an empty object is returned.
   */
  protected getProductImage(product: Product): { image?: string } {
    const image = product.images?.PRIMARY?.['zoom']?.url;
    return image ? { image } : {};
  }

  /**
   * Returns the brand object with the product manufacturer.
   *
   * If the brand is not available, an empty object is returned.
   */
  protected getProductBrand(product: Product): { brand?: string } {
    const brand = product.manufacturer;
    return brand ? { brand } : {};
  }
}
