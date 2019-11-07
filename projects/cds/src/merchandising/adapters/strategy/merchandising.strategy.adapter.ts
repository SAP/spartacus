import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { MERCHANDISING_PRODUCTS_NORMALIZER } from '../../connectors/strategy/converters';
import { StrategyAdapter } from '../../connectors/strategy/strategy.adapter';
import { MerchandisingProducts } from '../../model/merchandising.products';
import { StrategyResult } from '../../model/strategy.result';

const strategyProductsEndpointKey = 'strategyProducts';

@Injectable()
export class MerchandisingStrategyAdapter implements StrategyAdapter {
  constructor(
    private converterService: ConverterService,
    private cdsEndpointsService: CdsEndpointsService,
    protected http: HttpClient
  ) {}

  loadProductsForStrategy(
    strategyId: string
  ): Observable<MerchandisingProducts> {
    return this.http
      .get<StrategyResult>(
        this.cdsEndpointsService.getUrl(strategyProductsEndpointKey, {
          strategyId,
        })
      )
      .pipe(
        map(strategyResult =>
          this.converterService.convert(
            strategyResult,
            MERCHANDISING_PRODUCTS_NORMALIZER
          )
        )
      );
  }
}
