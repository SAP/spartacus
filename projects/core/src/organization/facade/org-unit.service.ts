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
  getApprovalProcessesState,
  getOrgUnitTreeState,
} from '../store/selectors/org-unit.selector';
import { B2BUnit, B2BUnitNode, B2BApprovalProcess } from '../../model';

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

  loadTree() {
    this.withUserId(userId =>
      this.store.dispatch(new OrgUnitActions.LoadTree({ userId }))
    );
  }

  loadApprovalProcesses() {
    this.withUserId(userId =>
      this.store.dispatch(new OrgUnitActions.LoadApprovalProcesses({ userId }))
    );
  }

  private getOrgUnitState(orgUnitId: string): Observable<LoaderState<B2BUnit>> {
    return this.store.select(getOrgUnitState(orgUnitId));
  }

  private getTreeState(): Observable<LoaderState<B2BUnitNode>> {
    return this.store.select(getOrgUnitTreeState());
  }

  private getOrgUnitsList(): Observable<LoaderState<B2BUnitNode[]>> {
    return this.store.select(getOrgUnitList());
  }

  private getApprovalProcessesList(): Observable<
    LoaderState<B2BApprovalProcess[]>
  > {
    return this.store.select(getApprovalProcessesState());
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

  getTree(): Observable<B2BUnitNode> {
    return this.getTreeState().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<B2BUnitNode>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadTree();
        }
      }),
      filter(
        (process: LoaderState<B2BUnitNode>) => process.success || process.error
      ),
      map(result => result.value)
    );
  }

  getApprovalProcesses(): Observable<B2BApprovalProcess[]> {
    return this.getApprovalProcessesList().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<B2BApprovalProcess[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadApprovalProcesses();
        }
      }),
      filter(
        (process: LoaderState<B2BApprovalProcess[]>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  getList(): Observable<B2BUnitNode[]> {
    return this.getOrgUnitsList().pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<B2BUnitNode[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrgUnitNodes();
        }
      }),
      filter(
        (process: LoaderState<B2BUnitNode[]>) =>
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
