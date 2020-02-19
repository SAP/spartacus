import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { BaseSiteService } from '../../site-context';
import { WindowRef } from '../../window/window-ref';
import { CartActions, MultiCartSelectors } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';

@Injectable({
  providedIn: 'root',
})
export class CartPersistanceService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected baseSiteService: BaseSiteService,
    private winRef: WindowRef
  ) {
    const activeBaseSite$ = this.baseSiteService.getActive().pipe(
      distinctUntilChanged(),
      filter(baseSite => !!baseSite)
    );

    const cartState$ = this.store.pipe(
      select(MultiCartSelectors.getMultiCartState)
    );

    cartState$
      .pipe(
        filter(state => !!state),
        map(state => {
          return {
            active: state.active,
          };
        }),
        distinctUntilKeyChanged('active'),
        withLatestFrom(activeBaseSite$)
      )
      .subscribe(([state, baseSite]) => {
        this.saveStateToStorage(state, baseSite);
      });

    activeBaseSite$.subscribe(baseSite => {
      const state = this.restoreStateFromStorage(baseSite);
      this.store.dispatch(new CartActions.ClearCart());
      this.store.dispatch(new CartActions.ClearMultiCartState());
      if (state) {
        this.store.dispatch(new CartActions.SetActiveCartId(state.active));
      }
    });
  }

  saveStateToStorage(state, baseSite) {
    this.winRef.localStorage.setItem(
      this.getStorageKey(baseSite),
      JSON.stringify(state)
    );
  }

  restoreStateFromStorage(baseSite) {
    try {
      const state = JSON.parse(
        this.winRef.localStorage.getItem(this.getStorageKey(baseSite))
      );
      return state;
    } catch {}
    return null;
  }

  getStorageKey(baseSite: string) {
    return `spartacus-cart-data-${baseSite}`;
  }
}
