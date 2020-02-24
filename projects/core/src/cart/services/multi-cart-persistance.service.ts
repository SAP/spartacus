import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { PersistanceService } from '../../state/services/persistance.service';
import { CartActions, MultiCartSelectors } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';

@Injectable({
  providedIn: 'root',
})
export class MultiCartPersistanceService {
  constructor(
    protected persistanceService: PersistanceService,
    protected store: Store<StateWithMultiCart>
  ) {
    const cartState$ = this.store.pipe(
      select(MultiCartSelectors.getMultiCartState)
    );

    const source = cartState$.pipe(
      filter(state => !!state),
      map(state => {
        return {
          active: state.active,
        };
      }),
      distinctUntilKeyChanged('active')
    );

    persistanceService
      .register('cart', source, [BASE_SITE_CONTEXT_ID])
      .subscribe(state => {
        this.store.dispatch(new CartActions.ClearCart());
        this.store.dispatch(new CartActions.ClearMultiCartState());
        if (state) {
          this.store.dispatch(new CartActions.SetActiveCartId(state.active));
        }
      });
  }
}
