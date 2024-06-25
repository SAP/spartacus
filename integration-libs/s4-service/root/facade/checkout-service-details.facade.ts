import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CheckoutServiceDetailsFacade {
  //add jsDoc for the param
  abstract updateServiceScheduleSlot(
    scheduledAt: string
  ): Observable<any> | undefined;
  // recheck the return types
}
