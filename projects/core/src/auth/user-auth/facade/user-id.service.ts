import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OCC_USER_ID_ANONYMOUS } from '../../../occ/utils/occ-constants';

// TODO: Add unit tests after we finalize API shape

/**
 * This implementation is OCC specific.
 * Different backend might have  completely different need regarding user id.
 * It might not need user id at all and work based on access_token.
 * To implement custom solution provide your own implementation and customize services that use UserIdService
 */
@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  private _userId = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

  setUserId(userId: string): void {
    this._userId.next(userId);
  }

  getUserId(): Observable<string> {
    return this._userId.asObservable();
  }

  clearUserId(): void {
    this.setUserId(OCC_USER_ID_ANONYMOUS);
  }
}
