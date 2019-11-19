import { Product } from './../../../../core/src/model/product.model';
import { CurrentProductService } from './../../../../storefrontlib/src/cms-components/product/current-product.service';
import { Injectable } from '@angular/core';
import { BaseSiteService, LanguageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { StrategyRequest } from './../../cds-models/cds-strategy-request.model';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingProducts } from './../model/merchandising.products.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(
    protected strategyConnector: MerchandisingStrategyConnector,
    protected baseSiteService: BaseSiteService,
    protected languageService: LanguageService,
    protected currentProductService: CurrentProductService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<MerchandisingProducts> {


  return this.currentProductService
        .getProduct()
        .pipe(
            filter(Boolean),
            //switchMap(product => product.code),
            withLatestFrom(
                this.baseSiteService.getActive(),
                this.languageService.getActive()
            ),
            tap(x => console.log('result is an array [string, string, string]', x)),
            map(([product, site, language]: [Product, string, string]) => {
                console.log('*****DEBUG - product code - ', product.code);
                const strategyRequest: StrategyRequest = {
                  site,
                  language,
                  pageSize: numberToDisplay,
                };
                return strategyRequest;
              }),
              switchMap(context =>
                this.strategyConnector.loadProductsForStrategy(strategyId, context)
              )
        );

  }
}
