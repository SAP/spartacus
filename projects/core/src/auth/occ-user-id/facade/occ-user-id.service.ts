import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SetOccUserId } from '../store/actions/occ-user-id.action';
import { StateWithOccUserId } from '../store/occ-user-id-state';
import { getOccUserId } from '../store/selectors/occ-user-id.selectors';

@Injectable({
  providedIn: 'root',
})
export class OccUserIdService {
  constructor(protected store: Store<StateWithOccUserId>) {}

  getUserId() {
    return this.store.pipe(select(getOccUserId));
  }

  setUserId(userId: string): void {
    this.store.dispatch(new SetOccUserId(userId));
  }
}
