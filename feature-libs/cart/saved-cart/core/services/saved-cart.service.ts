import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Cart,
  EntitiesModel,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartActions } from '../store/actions/index';

@Injectable({
  providedIn: 'root',
})
export class SavedCartService {
  constructor(
    protected store: Store<any | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  saveCart(cartId: string, cartDescription: string, cartName: string): void {
    this.userIdService.takeUserId(true).subscribe((userId) => {
      return this.store.dispatch(
        new SavedCartActions.SaveCart({
          userId,
          cartId,
          cartDescription,
          cartName,
        })
      );
    });
  }

  getList(): Observable<EntitiesModel<Cart>> {
    return of();
  }
}
