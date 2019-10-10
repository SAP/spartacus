import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  StateWithUser,
  REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
} from '../store/user-state';
import {
  ProductInterestList,
  ProductInterestRelation,
  NotificationType,
} from '../../model/product-interest.model';
import { tap, map } from 'rxjs/operators';
import { getProcessLoadingFactory } from '../../process/store/selectors/process.selectors';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';

@Injectable({
  providedIn: 'root',
})
export class UserInterestsService {
  constructor(protected store: Store<StateWithUser | StateWithProcess<void>>) {}

  /**
   * Retrieves an product interest list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadProductInterests(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    productCode?: string,
    notificationType?: NotificationType
  ): void {
    this.store.dispatch(
      new UserActions.LoadProductInterests({
        userId: OCC_USER_ID_CURRENT,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sort,
        productCode: productCode,
        notificationType: notificationType,
      })
    );
  }

  /**
   * Returns product interests list
   * @param pageSize page size
   */
  getProdutInterests(
    pageSize?: number,
    productCode?: string,
    notificationType?: NotificationType
  ): Observable<ProductInterestList> {
    return this.store.pipe(
      select(UsersSelectors.getInterestsState),
      tap(interestListState => {
        const attemptedLoad =
          interestListState.loading ||
          interestListState.success ||
          interestListState.error;
        if (!attemptedLoad) {
          this.loadProductInterests(
            pageSize,
            null,
            null,
            productCode,
            notificationType
          );
        }
      }),
      map(interestListState => interestListState.value)
    );
  }

  /**
   * Returns a loading flag for product interests
   */
  getProdutInterestsLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getInterestsLoading));
  }

  /**
   * Removes a ProductInterestRelation
   * @param item product interest relation item
   */
  removeProdutInterest(item: ProductInterestRelation): void {
    this.store.dispatch(
      new UserActions.RemoveProductInterests({
        userId: OCC_USER_ID_CURRENT,
        item: item,
      })
    );
  }

  /**
   * Returns a loading flag for removing product interests.
   */
  getRemoveProdutInterestLoading(): Observable<boolean> {
    return this.store.select(
      getProcessLoadingFactory(REMOVE_PRODUCT_INTERESTS_PROCESS_ID)
    );
  }

  /**
   * Clears product interests
   */
  clearProductInterests(): void {
    this.store.dispatch(new UserActions.ClearProductInterests());
  }
}
