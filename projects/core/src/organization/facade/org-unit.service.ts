import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { StateWithOrganization } from '../store/organization-state';
import { OrgUnitActions } from '../store/actions/index';
import {
  getOrgUnitState,
  getOrgUnitList,
} from '../store/selectors/org-unit.selector';
import { B2BUnit, B2BUnitNode, EntitiesModel } from '../../model';

@Injectable()
export class OrgUnitService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadOrgUnit(orgUnitId: string) {
    this.withUserId(userId =>
      this.store.dispatch(new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId }))
    );
  }

  loadOrgUnitNodes() {
    this.withUserId(userId =>
      this.store.dispatch(new OrgUnitActions.LoadOrgUnitNodes({ userId }))
    );
  }

  private getOrgUnitState(orgUnitId: string) {
    return this.store.select(getOrgUnitState(orgUnitId));
  }

  private getOrgUnitsList(): Observable<
    LoaderState<EntitiesModel<B2BUnitNode>>
  > {
    return this.store.select(getOrgUnitList());
  }

  get(orgUnitId: string): Observable<B2BUnit> {
    return this.getOrgUnitState(orgUnitId).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadOrgUnit(orgUnitId);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(): Observable<EntitiesModel<B2BUnitNode>> {
    return this.getOrgUnitsList().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<B2BUnitNode>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrgUnitNodes();
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<B2BUnitNode>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  create(unit: B2BUnit) {
    this.withUserId(userId =>
      this.store.dispatch(new OrgUnitActions.CreateUnit({ userId, unit }))
    );
  }

  update(unitCode: string, unit: B2BUnit) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitActions.UpdateUnit({ userId, unitCode, unit })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
