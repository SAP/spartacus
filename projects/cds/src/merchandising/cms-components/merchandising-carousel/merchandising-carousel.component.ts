import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingProduct,
  MerchandisingProducts,
} from '../../model/merchandising-products.model';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchandisingCarouselComponent {
  private componentData$: Observable<
    CmsMerchandisingCarouselComponent
  > = this.componentData.data$.pipe(filter(Boolean));

  title$: Observable<string> = this.componentData$.pipe(
    map(data => data.title)
  );

  merchandisingCarouselModel$: Observable<{
    items$: Observable<Product>[];
    metadata: Map<string, string>;
  }> = this.componentData$.pipe(
    distinctUntilKeyChanged('strategy'),
    switchMap(data =>
      this.cdsMerchandisingProductService.loadProductsForStrategy(
        data.strategy,
        data.numberToDisplay
      )
    ),
    withLatestFrom(this.componentData$),
    map(([merchandsingProducts, componentData]) => {
      const metadata = this.getCarouselMetadata(
        merchandsingProducts,
        componentData
      );
      merchandsingProducts.metadata = metadata;
      return merchandsingProducts;
    }),
    map(merchandsingProducts => {
      merchandsingProducts.products.forEach(
        (merchandisingProduct, index) =>
          (merchandisingProduct.metadata = this.getCarouselItemMetadata(
            merchandisingProduct,
            index + 1
          ))
      );
      return this.mapMerchandisingProductsToCarouselModel(merchandsingProducts);
    }),
    filter<{
      items$: Observable<Product>[];
      metadata: Map<string, string>;
    }>(Boolean)
  );

  private getCarouselMetadata(
    merchandisingProducts: MerchandisingProducts,
    componentData: CmsMerchandisingCarouselComponent
  ): Map<string, string> {
    const metadata = new Map<string, string>();

    if (merchandisingProducts.metadata) {
      merchandisingProducts.metadata.forEach((value, name) =>
        metadata.set(name, value)
      );
    }

    if (
      merchandisingProducts.products &&
      merchandisingProducts.products.length
    ) {
      metadata.set('slots', merchandisingProducts.products.length.toString());
    }

    metadata.set('title', componentData.title);
    metadata.set('name', componentData.name);
    metadata.set('strategyid', componentData.strategy);
    metadata.set('id', componentData.uid);

    return metadata;
  }

  getCarouselItemMetadata(
    merchandisingProduct: MerchandisingProduct,
    index: number
  ): Map<string, string> {
    const metadata = new Map<string, string>();

    if (merchandisingProduct.metadata) {
      merchandisingProduct.metadata.forEach((value, name) =>
        metadata.set(name, value)
      );
    }

    metadata.set('slot', index.toString());
    metadata.set('id', merchandisingProduct.code);

    return metadata;
  }

  private mapMerchandisingProductsToCarouselModel(
    merchandisingProducts: MerchandisingProducts
  ): {
    items$: Observable<Product>[];
    metadata: Map<string, string>;
  } {
    return {
      items$:
        merchandisingProducts && merchandisingProducts.products
          ? merchandisingProducts.products.map(product => of(product))
          : [EMPTY],
      metadata:
        merchandisingProducts && merchandisingProducts.metadata
          ? merchandisingProducts.metadata
          : undefined,
    };
  }

  constructor(
    protected componentData: CmsComponentData<
      CmsMerchandisingCarouselComponent
    >,
    protected cdsMerchandisingProductService: CdsMerchandisingProductService
  ) {}
}
