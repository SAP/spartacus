/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import {
  NotificationType,
  ProductInterestEntryRelation,
  ProductInterestSearchResult,
} from '../../model/product-interest.model';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { isNotUndefined } from '../../util';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  ADD_PRODUCT_INTEREST_PROCESS_ID,
  REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
  StateWithUser,
} from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserInterestsService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

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
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.LoadProductInterests({
          userId,
          pageSize: pageSize,
          currentPage: currentPage,
          sort: sort,
          productCode: productCode,
          notificationType: notificationType,
        })
      );
    });
  }

  /**
   * Returns product interests
   */
  getProductInterests(): Observable<ProductInterestSearchResult> {
    return (<Store<StateWithUser>>this.store).pipe(
      select(UsersSelectors.getInterests)
    );
  }

  /**
   * Returns product interests
   * @param pageSize the page size
   */
  getAndLoadProductInterests(
    pageSize?: number
  ): Observable<ProductInterestSearchResult> {
    return (<Store<StateWithUser>>this.store).pipe(
      select(UsersSelectors.getInterestsState),
      tap((interestListState) => {
        const attemptedLoad =
          interestListState.loading ||
          interestListState.success ||
          interestListState.error;
        if (!attemptedLoad) {
          this.loadProductInterests(pageSize);
        }
      }),
      map((interestListState) => interestListState.value),
      filter(isNotUndefined)
    );
  }

  /**
   * Returns a loading flag for product interests
   */
  getProdutInterestsLoading(): Observable<boolean> {
    return (<Store<StateWithUser>>this.store).pipe(
      select(UsersSelectors.getInterestsLoading)
    );
  }

  /**
   * Removes a ProductInterestRelation
   * @param item product interest relation item
   * @param singleDelete flag to delete only one interest
   */
  removeProdutInterest(
    item: ProductInterestEntryRelation,
    singleDelete?: boolean
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.RemoveProductInterest({
          userId,
          item: item,
          singleDelete: singleDelete,
        })
      );
    });
  }

  /**
   * Returns a loading flag for removing product interests.
   */
  getRemoveProdutInterestLoading(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(getProcessLoadingFactory(REMOVE_PRODUCT_INTERESTS_PROCESS_ID))
    );
  }

  /**
   * Returns a success flag for removing a product interests.
   */
  getRemoveProdutInterestSuccess(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(getProcessSuccessFactory(REMOVE_PRODUCT_INTERESTS_PROCESS_ID))
    );
  }

  /**
   * Add a new product interest.
   *
   * @param productCode the product code
   * @param notificationType the notification type
   */
  addProductInterest(
    productCode: string,
    notificationType: NotificationType
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.AddProductInterest({
          userId,
          productCode: productCode,
          notificationType: notificationType,
        })
      );
    });
  }

  /**
   * Returns a success flag for adding a product interest.
   */
  getAddProductInterestSuccess(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(getProcessSuccessFactory(ADD_PRODUCT_INTEREST_PROCESS_ID))
    );
  }

  /**
   * Returns a error flag for adding a product interest.
   */
  getAddProductInterestError(): Observable<boolean> {
    return (<Store<StateWithProcess<void>>>this.store).pipe(
      select(getProcessErrorFactory(ADD_PRODUCT_INTEREST_PROCESS_ID))
    );
  }

  /**
   * Reset product interest adding state.
   */
  resetAddInterestState(): void {
    this.store.dispatch(new UserActions.ResetAddInterestState());
  }

  /**
   * Reset product interest removing state.
   */
  resetRemoveInterestState(): void {
    this.store.dispatch(new UserActions.ResetRemoveInterestState());
  }

  /**
   * Clears product interests
   */
  clearProductInterests(): void {
    this.store.dispatch(new UserActions.ClearProductInterests());
  }
}
