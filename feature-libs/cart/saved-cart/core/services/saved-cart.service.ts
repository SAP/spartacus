import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Cart,
  EntitiesModel,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, tap } from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';
import { SavedCartSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class SavedCartService {
  constructor(
    protected store: Store<any | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  loadSavedCarts(): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        return this.store.dispatch(
          new SavedCartActions.LoadSavedCarts({ userId })
        );
      },
      () => {}
    );
  }

  getList(): Observable<EntitiesModel<Cart>> {
    return this.getSavedCartList().pipe(
      observeOn(queueScheduler),
      tap((state: StateUtils.LoaderState<EntitiesModel<Cart>>) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadSavedCarts();
        }
      }),
      filter(
        (state: StateUtils.LoaderState<EntitiesModel<Cart>>) =>
          state.success || state.error
      ),
      map((result) => {
        console.log('why', result);
        return result.value;
      })
    );
  }

  getSavedCartList(): Observable<StateUtils.LoaderState<EntitiesModel<Cart>>> {
    return this.store.select(SavedCartSelectors.getSavedCartList());
  }
}
