import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { StrategyAdapter } from '../../connectors/strategy/strategy.adapter';
import { StrategyResult } from '../../model/strategy.result';

const strategyProductsEndpointKey = 'strategyProducts';

@Injectable()
export class MerchandisingStrategyAdapter implements StrategyAdapter {
  constructor(
    private cdsEndpointsService: CdsEndpointsService,
    protected http: HttpClient
  ) {}

  loadProductsForStrategy(strategyId: string): Observable<StrategyResult> {
    return this.http.get<StrategyResult>(
      this.cdsEndpointsService.getUrl(strategyProductsEndpointKey, {
        strategyId,
      })
    );
  }
}
