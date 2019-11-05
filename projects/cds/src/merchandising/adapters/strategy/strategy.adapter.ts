import { Observable } from 'rxjs';
import { StrategyResult } from './../../model/strategy.result';

export abstract class StrategyAdapter {
  abstract load(strategyId: string): Observable<StrategyResult>;
}
