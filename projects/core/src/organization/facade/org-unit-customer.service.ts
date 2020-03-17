import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { OrgUnitCustomerActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { OrgUnitCustomer } from '../../model';
import {
  getOrgUnitCustomerState,
  getOrgUnitCustomerList,
} from '../store/selectors/org-unit-customer.selector';

@Injectable()
export class OrgUnitCustomerService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadOrgUnitCustomer(orgUnitCustomerId: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitCustomerActions.LoadOrgUnitCustomer({
          userId,
          orgUnitCustomerId,
        })
      )
    );
  }

  loadOrgUnitCustomers(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitCustomerActions.LoadOrgUnitCustomers({ userId, params })
      )
    );
  }

  private getOrgUnitCustomerState(
    orgUnitCustomerId: string
  ): Observable<LoaderState<OrgUnitCustomer>> {
    return this.store.select(getOrgUnitCustomerState(orgUnitCustomerId));
  }

  private getOrgUnitCustomerList(
    params
  ): Observable<LoaderState<EntitiesModel<OrgUnitCustomer>>> {
    return this.store.select(getOrgUnitCustomerList(params));
  }

  get(orgUnitCustomerId: string): Observable<OrgUnitCustomer> {
    return this.getOrgUnitCustomerState(orgUnitCustomerId).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadOrgUnitCustomer(orgUnitCustomerId);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(params: B2BSearchConfig): Observable<EntitiesModel<OrgUnitCustomer>> {
    return this.getOrgUnitCustomerList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<OrgUnitCustomer>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrgUnitCustomers(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<OrgUnitCustomer>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
