import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Address,
  AuthService,
  B2BUnit,
  B2BUser,
  CostCenter,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, take, tap } from 'rxjs/operators';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { B2BApprovalProcess } from '../model/order-approval.model';
import { B2BUnitNode } from '../model/unit-node.model';
import { OrgUnitActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';
import {
  getApprovalProcesses,
  getAssignedUsers,
  getB2BAddress,
  getB2BAddresses,
  getOrgUnit,
  getOrgUnitList,
  getOrgUnitTree,
  getOrgUnitValue,
} from '../store/selectors/org-unit.selector';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class OrgUnitService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  load(orgUnitId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId }))
    );
  }

  loadList(): void {
    this.withUserId((userId) =>
      this.store.dispatch(new OrgUnitActions.LoadOrgUnitNodes({ userId }))
    );
  }

  loadTree(): void {
    this.withUserId((userId) =>
      this.store.dispatch(new OrgUnitActions.LoadTree({ userId }))
    );
  }

  loadApprovalProcesses(): void {
    this.withUserId((userId) =>
      this.store.dispatch(new OrgUnitActions.LoadApprovalProcesses({ userId }))
    );
  }

  loadUsers(orgUnitId: string, roleId: string, params: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.LoadAssignedUsers({
          userId,
          orgUnitId,
          roleId,
          params,
        })
      )
    );
  }

  loadAddresses(orgUnitId: string): void {
    this.withUserId((userId) => {
      // TODO: replace it after turn on loadAddresses$
      // this.store.dispatch(
      //   new OrgUnitActions.LoadAddresses({ userId, orgUnitId })
      // );
      this.store.dispatch(
        new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId })
      );
    });
  }

  private getOrgUnit(
    orgUnitId: string
  ): Observable<StateUtils.LoaderState<B2BUnit>> {
    return this.store.select(getOrgUnit(orgUnitId));
  }

  private getOrgUnitValue(orgUnitId: string): Observable<B2BUnit> {
    return this.store.select(getOrgUnitValue(orgUnitId)).pipe(filter(Boolean));
  }

  private getTreeState(): Observable<StateUtils.LoaderState<B2BUnitNode>> {
    return this.store.select(getOrgUnitTree());
  }

  private getOrgUnitsList(): Observable<StateUtils.LoaderState<B2BUnitNode[]>> {
    return this.store.select(getOrgUnitList());
  }

  private getAddressesState(
    orgUnitId: string
  ): Observable<StateUtils.LoaderState<EntitiesModel<Address>>> {
    return this.store.select(getB2BAddresses(orgUnitId, null));
  }

  private getAddressState(
    addressId: string
  ): Observable<StateUtils.LoaderState<Address>> {
    return this.store.select(getB2BAddress(addressId));
  }

  private getAssignedUsers(
    orgUnitId: string,
    roleId: string,
    params: SearchConfig
  ): Observable<StateUtils.LoaderState<EntitiesModel<B2BUser>>> {
    return this.store.select(getAssignedUsers(orgUnitId, roleId, params));
  }

  private getApprovalProcessesList(): Observable<
    StateUtils.LoaderState<B2BApprovalProcess[]>
  > {
    return this.store.select(getApprovalProcesses());
  }

  get(orgUnitId: string): Observable<B2BUnit> {
    const loading$ = this.getOrgUnit(orgUnitId).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.load(orgUnitId);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getOrgUnitValue(orgUnitId)
    );
  }

  getCostCenters(orgUnitId: string): Observable<EntitiesModel<CostCenter>> {
    return this.get(orgUnitId).pipe(
      map((orgUnit) => ({
        values: orgUnit.costCenters ?? [],
      }))
    );
  }

  protected findUnitChildrenInTree(
    orginitId,
    unit: B2BUnitNode
  ): B2BUnitNode[] {
    return unit.id === orginitId
      ? unit.children
      : unit.children.flatMap((child) =>
          this.findUnitChildrenInTree(orginitId, child)
        );
  }

  getChildUnits(orgUnitId: string): Observable<EntitiesModel<B2BUnitNode>> {
    return this.getTree().pipe(
      map((tree) => ({
        values: this.findUnitChildrenInTree(orgUnitId, tree),
      }))
    );
  }

  getTree(): Observable<B2BUnitNode> {
    return this.getTreeState().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<B2BUnitNode>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadTree();
        }
      }),
      filter(
        (process: StateUtils.LoaderState<B2BUnitNode>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  getApprovalProcesses(): Observable<B2BApprovalProcess[]> {
    return this.getApprovalProcessesList().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<B2BApprovalProcess[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadApprovalProcesses();
        }
      }),
      filter(
        (process: StateUtils.LoaderState<B2BApprovalProcess[]>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  getList(): Observable<B2BUnitNode[]> {
    return this.getOrgUnitsList().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<B2BUnitNode[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadList();
        }
      }),
      filter(
        (process: StateUtils.LoaderState<B2BUnitNode[]>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  getActiveUnitList(): Observable<B2BUnitNode[]> {
    return this.getList().pipe(
      map((units) => units.filter((unit) => unit.active))
    );
  }

  getUsers(
    orgUnitId: string,
    roleId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<B2BUser>> {
    return this.getAssignedUsers(orgUnitId, roleId, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadUsers(orgUnitId, roleId, params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  create(unit: B2BUnit): void {
    this.withUserId((userId) =>
      this.store.dispatch(new OrgUnitActions.CreateUnit({ userId, unit }))
    );
  }

  update(unitCode: string, unit: B2BUnit): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.UpdateUnit({ userId, unitCode, unit })
      )
    );
  }

  getLoadingStatus(
    orgUnitId: string
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    return getItemStatus(this.getOrgUnit(orgUnitId));
  }

  assignRole(orgCustomerId: string, roleId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.AssignRole({
          userId,
          orgCustomerId,
          roleId,
        })
      )
    );
  }

  unassignRole(orgCustomerId: string, roleId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.UnassignRole({
          userId,
          orgCustomerId,
          roleId,
        })
      )
    );
  }

  assignApprover(
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.AssignApprover({
          orgUnitId,
          userId,
          orgCustomerId,
          roleId,
        })
      )
    );
  }

  unassignApprover(
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.UnassignApprover({
          orgUnitId,
          userId,
          orgCustomerId,
          roleId,
        })
      )
    );
  }

  createAddress(orgUnitId: string, address: Address): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.CreateAddress({
          userId,
          orgUnitId,
          address,
        })
      )
    );
  }

  getAddresses(orgUnitId: string): Observable<EntitiesModel<Address>> {
    return this.getAddressesState(orgUnitId).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadAddresses(orgUnitId);
        }
      }),
      filter((state) => state.success || state.error),
      map((state) => state.value)
    );
  }

  getAddress(orgUnitId: string, addressId: string): Observable<Address> {
    return this.getAddressState(addressId).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadAddresses(orgUnitId);
        }
      }),
      filter((state) => state.success || state.error),
      map((state) => state.value)
    );
  }

  updateAddress(orgUnitId: string, addressId: string, address: Address): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.UpdateAddress({
          userId,
          orgUnitId,
          addressId,
          address,
        })
      )
    );
  }

  getAddressLoadingStatus(
    addressId: string
  ): Observable<OrganizationItemStatus<Address>> {
    return getItemStatus(this.getAddressState(addressId));
  }

  deleteAddress(orgUnitId: string, addressId: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrgUnitActions.DeleteAddress({
          userId,
          orgUnitId,
          addressId,
        })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
