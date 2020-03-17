import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EntitiesModel } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { OrgUnitCustomerActions } from '../actions/index';
import { normalizeListPage } from '../../utils/serializer';
import { OrgUnitCustomer } from '../../../model';
import { OrgUnitCustomerConnector } from '../../connectors';

@Injectable()
export class OrgUnitCustomerEffects {
  @Effect()
  loadOrgUnitCustomer$: Observable<
    | OrgUnitCustomerActions.LoadOrgUnitCustomerSuccess
    | OrgUnitCustomerActions.LoadOrgUnitCustomerFail
  > = this.actions$.pipe(
    ofType(OrgUnitCustomerActions.LOAD_ORG_UNIT_CUSTOMER),
    map((action: OrgUnitCustomerActions.LoadOrgUnitCustomer) => action.payload),
    switchMap(({ userId, orgUnitCustomerId }) => {
      return this.orgUnitCustomerConnector.get(userId, orgUnitCustomerId).pipe(
        map((orgUnitCustomer: OrgUnitCustomer) => {
          return new OrgUnitCustomerActions.LoadOrgUnitCustomerSuccess([
            orgUnitCustomer,
          ]);
        }),
        catchError(error =>
          of(
            new OrgUnitCustomerActions.LoadOrgUnitCustomerFail({
              orgUnitCustomerId,
              error: makeErrorSerializable(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadOrgUnitCustomers$: Observable<
    | OrgUnitCustomerActions.LoadOrgUnitCustomersSuccess
    | OrgUnitCustomerActions.LoadOrgUnitCustomerSuccess
    | OrgUnitCustomerActions.LoadOrgUnitCustomersFail
  > = this.actions$.pipe(
    ofType(OrgUnitCustomerActions.LOAD_ORG_UNIT_CUSTOMERS),
    map(
      (action: OrgUnitCustomerActions.LoadOrgUnitCustomers) => action.payload
    ),
    switchMap(payload =>
      this.orgUnitCustomerConnector
        .getList(payload.userId, payload.params)
        .pipe(
          switchMap((orgUnitCustomers: EntitiesModel<OrgUnitCustomer>) => {
            const { values, page } = normalizeListPage(orgUnitCustomers, 'uid');
            return [
              new OrgUnitCustomerActions.LoadOrgUnitCustomerSuccess(values),
              new OrgUnitCustomerActions.LoadOrgUnitCustomersSuccess({
                page,
                params: payload.params,
              }),
            ];
          }),
          catchError(error =>
            of(
              new OrgUnitCustomerActions.LoadOrgUnitCustomersFail({
                params: payload.params,
                error: makeErrorSerializable(error),
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private orgUnitCustomerConnector: OrgUnitCustomerConnector
  ) {}
}
