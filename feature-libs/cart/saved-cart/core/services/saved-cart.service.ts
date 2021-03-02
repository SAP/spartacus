import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  MultiCartService,
  ProcessSelectors,
  StateWithMultiCart,
  StateWithProcess,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartActions } from '../store/actions/index';
import { SAVED_CART_SAVE_CART_PROCESS_ID } from '../store/saved-cart-state';

@Injectable({
  providedIn: 'root',
})
export class SavedCartService {
  constructor(
    protected store: Store<StateWithMultiCart | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected userService: UserService,
    protected multiCartService: MultiCartService
  ) {}

  saveCart({
    cartId,
    saveCartName,
    saveCartDescription,
    extraData,
  }: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
    extraData?: { edit: boolean };
  }): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.SaveCart({
            userId,
            cartId,
            saveCartName,
            saveCartDescription,
            extraData,
          })
        );
      },
      () => {}
    );
  }

  getSaveCartProcessLoading(): Observable<boolean> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(
          SAVED_CART_SAVE_CART_PROCESS_ID
        )
      )
    );
  }

  getSaveCartProcessSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(
          SAVED_CART_SAVE_CART_PROCESS_ID
        )
      )
    );
  }

  getSaveCartProcessError(): Observable<boolean> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessErrorFactory(SAVED_CART_SAVE_CART_PROCESS_ID)
      )
    );
  }
}
