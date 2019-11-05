import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyResult } from './../../model/strategy.result';
import { StrategyAdapter } from './strategy.adapter';

@Injectable()
export class MerchandisingStrategyAdapter implements StrategyAdapter {
  constructor(protected http: HttpClient) {}

  load(strategyId: string): Observable<StrategyResult> {
    return this.http.get<StrategyResult>(
      `https://api.stage.context.cloud.sap/strategy/cvappareluk/strategies/${strategyId}/products`
    );
  }
}
