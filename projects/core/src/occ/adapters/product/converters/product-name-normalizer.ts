import { Injectable } from '@angular/core';

import { Product } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class ProductNameNormalizer implements Converter<Occ.Product, Product> {
  constructor(protected config: OccConfig) {}

  convert(source: Occ.Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    if (source.name) {
      target.name = this.normalize(source.name);
      target.nameHtml = source.name;
    }
    return target;
  }

  protected normalize(name: string): string {
    return name.replace(/<[^>]*>/g, '');
  }
}
