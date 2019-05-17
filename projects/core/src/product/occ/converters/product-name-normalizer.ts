import { Injectable } from '@angular/core';
import { OccConfig } from '../../../occ/config/occ-config';
import { Occ } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';
import { Product } from '../../../model/product.model';

@Injectable()
export class ProductNameNormalizer implements Converter<Occ.Product, Product> {
  constructor(protected config: OccConfig) {}

  convert(source: Occ.Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    if (source.name) {
      target.name = this.transform(source.name);
      target.nameHtml = source.name;
    }
    return target;
  }

  transform(name): string {
    return name.replace(/<[^>]*>/g, '');
  }
}
