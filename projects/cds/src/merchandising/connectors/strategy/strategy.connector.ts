import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StrategyAdapter } from "./strategy.adapter";
import { StrategyResult } from "../../model/strategy.result";

@Injectable()
export class StrategyConnector {
  constructor(protected strategyAdapter: StrategyAdapter) {}

  loadProductsForStrategy(strategyId: string): Observable<StrategyResult> {
    return this.strategyAdapter.loadProductsForStrategy(strategyId);
  }
}