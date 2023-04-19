/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  CostCenter,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
import { OrganizationItemStatus } from '../model/organization-item-status';
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
  getOrgUnitState,
  getOrgUnitTree,
  getOrgUnitValue,
} from '../store/selectors/org-unit.selector';
import { getItemStatus } from '../utils/get-item-status';

@Injectable({ providedIn: 'root' })
export class OrgUnitService {
  constructor(
    protected store: Store<StateWithOrganization>,
    protected userIdService: UserIdService
  ) {}

  clearAssignedUsersList(
    orgUnitId: string,
    roleId: string,
    params: SearchConfig
  ): void {
    this.store.dispatch(
      new OrgUnitActions.ClearAssignedUsers({ orgUnitId, roleId, params })
    );
  }

  load(orgUnitId: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadList(): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(new OrgUnitActions.LoadOrgUnitNodes({ userId })),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadTree(): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(new OrgUnitActions.LoadTree({ userId })),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadApprovalProcesses(): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.LoadApprovalProcesses({ userId })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadUsers(orgUnitId: string, roleId: string, params: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.LoadAssignedUsers({
            userId,
            orgUnitId,
            roleId,
            params,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  loadAddresses(orgUnitId: string): void {
    // TODO: replace it after turn on loadAddresses$
    // this.store.dispatch(
    //   new OrgUnitActions.LoadAddresses({ userId, orgUnitId })
    // );
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  private getOrgUnit(
    orgUnitId: string
  ): Observable<StateUtils.LoaderState<B2BUnit>> {
    return this.store.select(getOrgUnit(orgUnitId));
  }

  private getOrgUnitValue(orgUnitId: string): Observable<B2BUnit> {
    return this.store
      .select(getOrgUnitValue(orgUnitId))
      .pipe(filter((orgUnit) => Boolean(orgUnit)));
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
    return this.store.select(getB2BAddresses(orgUnitId));
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
    orginitId: string,
    unit: B2BUnitNode
  ): B2BUnitNode[] {
    return unit.id === orginitId
      ? unit.children ?? []
      : (unit.children ?? []).flatMap((child) =>
          this.findUnitChildrenInTree(orginitId, child)
        );
  }

  getChildUnits(orgUnitId: string): Observable<EntitiesModel<B2BUnitNode>> {
    return this.getTree().pipe(
      map((tree) => ({
        values: tree ? this.findUnitChildrenInTree(orgUnitId, tree) : [],
      }))
    );
  }

  getTree(): Observable<B2BUnitNode | undefined> {
    return this.getTreeState().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<B2BUnitNode>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadTree();
        }
      }),
      filter((process: StateUtils.LoaderState<B2BUnitNode>) =>
        Boolean(process.success || process.error)
      ),
      map((result) => result.value)
    );
  }

  getApprovalProcesses(): Observable<B2BApprovalProcess[] | undefined> {
    return this.getApprovalProcessesList().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<B2BApprovalProcess[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadApprovalProcesses();
        }
      }),
      filter((process: StateUtils.LoaderState<B2BApprovalProcess[]>) =>
        Boolean(process.success || process.error)
      ),
      map((result) => result.value)
    );
  }

  getList(): Observable<B2BUnitNode[] | undefined> {
    return this.getOrgUnitsList().pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<B2BUnitNode[]>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadList();
        }
      }),
      filter((process: StateUtils.LoaderState<B2BUnitNode[]>) =>
        Boolean(process.success || process.error)
      ),
      map((result) => result.value)
    );
  }

  getActiveUnitList(): Observable<B2BUnitNode[] | undefined> {
    return this.getList().pipe(
      map((units) => units?.filter((unit) => unit.active)),
      map((units) => units?.sort(this.sortUnitList))
    );
  }

  protected sortUnitList(a: B2BUnitNode, b: B2BUnitNode) {
    return (a.id ?? '').toLowerCase() < (b.id ?? '').toLowerCase()
      ? -1
      : (a.id ?? '').toLowerCase() > (b.id ?? '').toLowerCase()
      ? 1
      : 0;
  }

  getUsers(
    orgUnitId: string,
    roleId: string,
    params: SearchConfig
  ): Observable<EntitiesModel<B2BUser> | undefined> {
    return this.getAssignedUsers(orgUnitId, roleId, params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadUsers(orgUnitId, roleId, params);
        }
      }),
      filter((process: StateUtils.LoaderState<EntitiesModel<B2BUser>>) =>
        Boolean(process.success || process.error)
      ),
      map((result) => result.value)
    );
  }

  getErrorState(orgCustomerId: string): Observable<boolean> {
    return this.getOrgUnitState(orgCustomerId).pipe(
      map((state) => state.error ?? false)
    );
  }

  create(unit: B2BUnit): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(new OrgUnitActions.CreateUnit({ userId, unit })),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  update(unitCode: string, unit: B2BUnit): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.UpdateUnit({ userId, unitCode, unit })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getLoadingStatus(
    orgUnitId: string
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    return getItemStatus(this.getOrgUnit(orgUnitId));
  }

  assignRole(orgCustomerId: string, roleId: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.AssignRole({
            userId,
            orgCustomerId,
            roleId,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  unassignRole(orgCustomerId: string, roleId: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.UnassignRole({
            userId,
            orgCustomerId,
            roleId,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  assignApprover(
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.AssignApprover({
            orgUnitId,
            userId,
            orgCustomerId,
            roleId,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  unassignApprover(
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string
  ): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.UnassignApprover({
            orgUnitId,
            userId,
            orgCustomerId,
            roleId,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  createAddress(orgUnitId: string, address: Address): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.CreateAddress({
            userId,
            orgUnitId,
            address,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getAddresses(
    orgUnitId: string
  ): Observable<EntitiesModel<Address> | undefined> {
    return this.getAddressesState(orgUnitId).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadAddresses(orgUnitId);
        }
      }),
      filter((state) => Boolean(state.success || state.error)),
      map((state) => state.value)
    );
  }

  getAddress(
    orgUnitId: string,
    addressId: string
  ): Observable<Address | undefined> {
    return this.getAddressState(addressId).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadAddresses(orgUnitId);
        }
      }),
      filter((state) => Boolean(state.success || state.error)),
      map((state) => state.value)
    );
  }

  updateAddress(orgUnitId: string, addressId: string, address: Address): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.UpdateAddress({
            userId,
            orgUnitId,
            addressId,
            address,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  getAddressLoadingStatus(
    addressId: string
  ): Observable<OrganizationItemStatus<Address>> {
    return getItemStatus(this.getAddressState(addressId));
  }

  deleteAddress(orgUnitId: string, addressId: string): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrgUnitActions.DeleteAddress({
            userId,
            orgUnitId,
            addressId,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  private getOrgUnitState(
    orgUnitId: string
  ): Observable<StateUtils.LoaderState<B2BUnit>> {
    return this.store.select(getOrgUnitState(orgUnitId));
  }

  isUpdatingUnitAllowed(): boolean {
    return true;
  }
}
