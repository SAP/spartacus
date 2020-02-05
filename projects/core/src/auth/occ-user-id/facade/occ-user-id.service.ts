import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StateWithAuth } from '../../store/auth-state';
import { SetOccUserId } from '../store/actions/occ-user-id.action';
import { getOccUserId } from '../store/selectors/occ-user-id.selectors';

@Injectable({
  providedIn: 'root',
})
export class OccUserIdService {
  constructor(protected store: Store<StateWithAuth>) {}

  getUserId() {
    return this.store.pipe(select(getOccUserId));
  }

  setUserId(userId: string): void {
    this.store.dispatch(new SetOccUserId(userId));
  }
}
