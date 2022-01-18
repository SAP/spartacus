import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Address } from '../../model/address.model';
import { CostCenter } from '../../model/org-unit.model';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserCostCenterService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Load all visible active cost centers for the currently login user
   */
  loadActiveCostCenters(): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        this.store.dispatch(new UserActions.LoadActiveCostCenters(userId));
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  private getCostCentersState(): Observable<LoaderState<CostCenter[]>> {
    return this.store.select(UsersSelectors.getCostCentersState);
  }

  /**
   * Get all visible active cost centers
   */
  getActiveCostCenters(): Observable<CostCenter[]> {
    return this.getCostCentersState().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<CostCenter[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadActiveCostCenters();
        }
      }),
      filter(
        (process: LoaderState<CostCenter[]>) => process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  /**
   * Get the addresses of the cost center's unit based on cost center id
   * @param costCenterId cost center id
   */
  getCostCenterAddresses(costCenterId: string): Observable<Address[]> {
    return this.getActiveCostCenters().pipe(
      map((costCenters) => {
        const costCenter = costCenters.find((cc) => cc.code === costCenterId);
        if (costCenter && costCenter.unit) {
          return costCenter.unit.addresses;
        } else {
          return [];
        }
      })
    );
  }
}
