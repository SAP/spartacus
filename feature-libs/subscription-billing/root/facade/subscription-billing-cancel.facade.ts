import { Observable } from 'rxjs';
import { CancellationDetails ,withdrawal} from '../model';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export abstract class CancelSubscriptionFacade {
  abstract cancelSubscription(
    CancellationDetails: CancellationDetails,
    code?: string
  ): Observable<unknown>;
  abstract cancellationSubscriptionEffectiveDate(
    code: string
  ): Observable<any>;



  abstract reverseCancellation(
    code?: string
  ): Observable<unknown>;
  abstract withdrawal(
    withdrawal: withdrawal,
    code?: string
  ): Observable<unknown>;
}
