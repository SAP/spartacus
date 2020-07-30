import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractUserIdService } from './abstract-user-id.service';

// TODO: Add unit tests after we finalize API shape
@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  constructor(protected abstractUserIdService: AbstractUserIdService) {}

  getUserId(): Observable<string> {
    return this.abstractUserIdService.getUserId();
  }

  setUserId(userId: string) {
    return this.abstractUserIdService.setUserId(userId);
  }

  clearUserId() {
    return this.abstractUserIdService.clearUserId();
  }

  isCustomerEmulated(): Observable<boolean> {
    return this.abstractUserIdService.isCustomerEmulated();
  }
}
