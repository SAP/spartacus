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
      const items$ = this.mapMerchandisingProductsToCarouselItems(
        merchandsingProducts
      );
      return {
        items$,
        metadata,
      };
    })
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

  private mapMerchandisingProductsToCarouselItems(
    merchandisingProducts: MerchandisingProducts
  ): Observable<MerchandisingProduct>[] {
    return merchandisingProducts && merchandisingProducts.products
      ? merchandisingProducts.products.map((product, index) => {
          product.metadata = this.getCarouselItemMetadata(product, index + 1);
          return of(product);
        })
      : [EMPTY];
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

  constructor(
    protected componentData: CmsComponentData<
      CmsMerchandisingCarouselComponent
    >,
    protected cdsMerchandisingProductService: CdsMerchandisingProductService
  ) {}
}
