import { Injectable } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { combineLatest, EMPTY, from, Observable, of, zip } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { StrategyProduct, StrategyProducts } from '../model';
import {
  MerchandisingProduct,
  MerchandisingProducts,
} from '../model/merchandising-products.model';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';
import { StrategyRequest } from './../../cds-models/cds-strategy-request.model';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingSiteContext } from './../model/merchandising-site-context.model';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(
    protected strategyConnector: MerchandisingStrategyConnector,
    protected merchandisingUserContextService: CdsMerchandisingUserContextService,
    protected merchandisingSiteContextService: CdsMerchandisingSiteContextService,
    protected productService: ProductService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<MerchandisingProducts> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext(),
    ]).pipe(
      map(
        ([siteContext, userContext]: [
          MerchandisingSiteContext,
          MerchandisingUserContext
        ]) => {
          return {
            ...siteContext,
            ...userContext,
            pageSize: numberToDisplay,
          } as StrategyRequest;
        }
      ),
      mergeMap(context =>
        this.strategyConnector.loadProductsForStrategy(strategyId, context)
      ),
      mergeMap(strategyProducts => {
        console.log(
          'mapping startegyProducts to merchandising products',
          strategyProducts
        );
        return this.getMerchandisingProductsForStrategyProducts(
          strategyProducts
        );
      })
    );
  }

  private getMerchandisingProductsForStrategyProducts(
    strategyProducts: StrategyProducts
  ): Observable<MerchandisingProducts> {
    return zip(
      of({
        products: [],
        metadata: strategyProducts.metadata
          ? new Map<string, string>(Object.entries(strategyProducts.metadata))
          : new Map<string, string>(),
      } as MerchandisingProducts),
      strategyProducts.products
        ? from(strategyProducts.products).pipe(
            mergeMap(strategyProduct =>
              this.getMerchandisingProductForStrategyProduct(strategyProduct)
            ),
            toArray()
          )
        : EMPTY
    ).pipe(
      map(([merchandisingProducts, products]) => {
        merchandisingProducts.products = products;
        console.log('merchandising products populated with products', products);
        return merchandisingProducts;
      })
    );

    // map(merchandisingProducts => {
    //   console.log(
    //     'created base merchandising products, about to iterate over each startegy product',
    //     merchandisingProducts
    //   );

    //   // strategyProducts.products.forEach(strategyProduct => {
    //   //   console.log('iterating over strategy product', strategyProduct);
    //   //   this.getMerchandisingProductForStrategyProduct(strategyProduct).pipe(
    //   //     tap(merchandisingProduct => {
    //   //       console.log(
    //   //         'pushed product to merchandising products',
    //   //         merchandisingProduct
    //   //       );
    //   //       merchandisingProducts.products.push(merchandisingProduct);
    //   //     })
    //   //   );
    //   // });
    //   return merchandisingProducts;
    // })
  }

  private getMerchandisingProductForStrategyProduct(
    strategyProduct: StrategyProduct
  ): Observable<MerchandisingProduct> {
    return this.productService.get(strategyProduct.id).pipe(
      map(product => {
        console.log('retrieved product', product);
        return {
          ...product,
          meatdata: strategyProduct.metadata
            ? new Map<string, string>(Object.entries(strategyProduct.metadata))
            : undefined,
        } as MerchandisingProduct;
      })
    );
  }
}
