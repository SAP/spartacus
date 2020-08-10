import { Injectable } from '@angular/core';
import { OccConfig } from '../../../../../../../../../projects/core/src/occ/config/occ-config';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { Converter } from '../../../../../../../../../projects/core/src/util/converter.service';
import { Product } from '../../../../../../../../../projects/core/src/model/product.model';

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
