import { BehaviorSubject, Observable } from 'rxjs';

// TODO: Add unit tests after we finalize API shape
export abstract class AbstractUserIdService {
  private _userId = new BehaviorSubject<string>('');

  constructor() {}

  setUserId(userId) {
    return this._userId.next(userId);
  }

  getUserId() {
    return this._userId.asObservable();
  }

  clearUserId() {
    return this.setUserId('');
  }

  abstract isCustomerEmulated(): Observable<boolean>;
}
