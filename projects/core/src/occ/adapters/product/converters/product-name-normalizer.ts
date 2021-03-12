import { Injectable } from '@angular/core';
import { Product } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class ProductNameNormalizer implements Converter<Occ.Product, Product> {
  constructor(protected config: OccConfig) {}

  convert(source: Occ.Product, target?: Product): Product {
    target = target ?? { ...((source as any) as Partial<Product>) };

    if (source.name) {
      target.name = this.normalize(source.name);
      target.slug = this.normalizeSlug(source.name);
      target.nameHtml = source.name;
    }
    return target as Product;
  }

  protected normalize(name: string): string {
    return name.replace(/<[^>]*>/g, '');
  }

  /**
   * Provides a title slug for the pretty URL.
   *
   * The name is created in lowercase, trimmed and all special characters that are candidates for url encoded
   * are replaced by the slug char (dash by default).
   */
  protected normalizeSlug(name: string): string {
    // https://developers.google.com/maps/documentation/urls/url-encoding
    const reservedChars = ` !*'();:@&=+$,/?%#[]`;
    const re = new RegExp(`[${reservedChars.split('').join('\\')}]`, 'g');
    return name.trim().toLowerCase().replace(re, '-').replace(/[-]+/g, '-');
  }
}
