import { PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class PromotionService {
  abstract getOrderPromotions(): Observable<PromotionResult[]>;
}
