import { Injectable } from '@angular/core';
import { Converter, ConverterService } from '@spartacus/core';
import { MERCHANDISING_PRODUCT_NORMALIZER } from '../connectors/strategy/converters';
import { MerchandisingProducts } from '../model/merchandising.products';
import { StrategyResult } from '../model/strategy.result';

@Injectable()
export class MerchandisingProductsNormalizer
  implements Converter<StrategyResult, MerchandisingProducts> {
  constructor(private convertorService: ConverterService) {}

  convert(
    source: StrategyResult,
    target?: MerchandisingProducts
  ): MerchandisingProducts {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.metadata) {
      target.metadata = source.metadata;
    }

    if (source.products) {
      target.products = source.products.map(merchandisingProduct =>
        this.convertorService.convert(
          merchandisingProduct,
          MERCHANDISING_PRODUCT_NORMALIZER
        )
      );
    }

    return target;
  }
}
