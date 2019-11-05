import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyResult } from './../../model/strategy.result';
import { StrategyAdapter } from './strategy.adapter';

@Injectable()
export class MerchandisingStrategyAdapter implements StrategyAdapter {
  constructor(protected http: HttpClient) {}

  load(strategyId: string): Observable<StrategyResult> {
    console.log('*****DEBUG - about to get strategies');

    console.log(`******DEBUG - http object - ${typeof this.http}`);
    this.http
      .get(
        `https://api.stage.context.cloud.sap/strategy/cvappareluk/strategies/${strategyId}/products`,
        { observe: 'response' }
      )
      .subscribe(
        result => {
          console.log(`****DEBUG - result - ${result}`);
        },
        error => {
          console.log(`*****ERROR - ${error}`);
        },
        () => {
          console.log('*****COMPLETED');
        }
      );

    return this.http.get<StrategyResult>(
      `https://api.stage.context.cloud.sap/strategy/cvappareluk/strategies/${strategyId}/products`
    );
  }
}
