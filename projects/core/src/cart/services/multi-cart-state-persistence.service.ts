import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { BASE_SITE_CONTEXT_ID } from '../../site-context';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { CartActions, MultiCartSelectors } from '../store';
import { StateWithMultiCart } from '../store/multi-cart-state';

@Injectable({
  providedIn: 'root',
})
export class MultiCartStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithMultiCart>,
    protected siteContextParamsService: SiteContextParamsService
  ) {}

  public sync() {
    this.statePersistenceService.syncWithStorage({
      key: 'cart',
      state$: this.getCartState(),
      context$: this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]),
      onRead: (state) => this.onRead(state),
    });
  }

  protected getCartState(): Observable<{ active: string }> {
    return this.store.pipe(
      select(MultiCartSelectors.getMultiCartState),
      filter((state) => !!state),
      distinctUntilKeyChanged('active'),
      map((state) => {
        return {
          active: state.active,
        };
      })
    );
  }

  protected onRead(state: { active: string }) {
    this.store.dispatch(new CartActions.ClearMultiCartState());
    if (state) {
      this.store.dispatch(new CartActions.SetActiveCartId(state.active));
    }
  }
}
