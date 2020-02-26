import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { CartActions, MultiCartSelectors } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';

@Injectable()
export class MultiCartStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithMultiCart>
  ) {
    this.sync();
  }

  protected sync() {
    const source$ = this.store.pipe(
      select(MultiCartSelectors.getMultiCartState),
      filter(state => !!state),
      distinctUntilKeyChanged('active'),
      map(state => {
        return {
          active: state.active,
        };
      })
    );

    this.statePersistenceService
      .syncWithStorage('cart', source$, [BASE_SITE_CONTEXT_ID])
      .subscribe(state => {
        this.store.dispatch(new CartActions.ClearCart());
        this.store.dispatch(new CartActions.ClearMultiCartState());
        if (state) {
          this.store.dispatch(new CartActions.SetActiveCartId(state.active));
        }
      });
  }
}
