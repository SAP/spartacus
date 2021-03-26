import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserActions } from '../actions/index';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { UserInterestsConnector } from '../../connectors/interests/user-interests.connector';
import { normalizeHttpError } from '../../../util/normalize-http-error';

@Injectable()
export class ProductInterestsEffect {
  constructor(
    private actions$: Actions,
    private userInterestsConnector: UserInterestsConnector
  ) {}

  @Effect()
  loadProductInteres$: Observable<UserActions.ProductInterestsAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_PRODUCT_INTERESTS),
    map((action: UserActions.LoadProductInterests) => action.payload),
    switchMap((payload) => {
      return this.userInterestsConnector
        .getInterests(
          payload.userId,
          payload.pageSize,
          payload.currentPage,
          payload.sort,
          payload.productCode,
          payload.notificationType
        )
        .pipe(
          map((interests: ProductInterestSearchResult) => {
            return new UserActions.LoadProductInterestsSuccess(interests);
          }),
          catchError((error) =>
            of(
              new UserActions.LoadProductInterestsFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  removeProductInterest$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.REMOVE_PRODUCT_INTEREST),
    map((action: UserActions.RemoveProductInterest) => action.payload),
    switchMap((payload) =>
      this.userInterestsConnector
        .removeInterest(payload.userId, payload.item)
        .pipe(
          switchMap((data) => [
            new UserActions.LoadProductInterests(
              payload.singleDelete
                ? {
                    userId: payload.userId,
                    productCode: payload.item.product.code,
                    notificationType:
                      payload.item.productInterestEntry[0].interestType,
                  }
                : { userId: payload.userId }
            ),
            new UserActions.RemoveProductInterestSuccess(data),
          ]),
          catchError((error) =>
            of(
              new UserActions.RemoveProductInterestFail(
                normalizeHttpError(error)
              )
            )
          )
        )
    )
  );

  @Effect()
  addProductInterest$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.ADD_PRODUCT_INTEREST),
    map((action: UserActions.AddProductInterest) => action.payload),
    switchMap((payload) =>
      this.userInterestsConnector
        .addInterest(
          payload.userId,
          payload.productCode,
          payload.notificationType
        )
        .pipe(
          switchMap((res: any) => [
            new UserActions.LoadProductInterests({
              userId: payload.userId,
              productCode: payload.productCode,
              notificationType: payload.notificationType,
            }),
            new UserActions.AddProductInterestSuccess(res),
          ]),
          catchError((error) =>
            of(
              new UserActions.AddProductInterestFail(normalizeHttpError(error))
            )
          )
        )
    )
  );
}
