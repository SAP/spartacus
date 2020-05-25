import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { CostCenter } from '../../model/org-unit.model';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserCostCenterService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadActiveCostCenters(): void {
    this.withUserId((userId) =>
      this.store.dispatch(new UserActions.LoadActiveCostCenters(userId))
    );
  }

  private getCostCentersState(): Observable<LoaderState<CostCenter[]>> {
    return this.store.select(UsersSelectors.getCostCentersState);
  }

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

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
