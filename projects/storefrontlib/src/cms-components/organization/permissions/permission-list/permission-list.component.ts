import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {
  PermissionService,
  PermissionListModel,
  RoutingService,
  CxDatePipe,
  PermissionSearchConfig,
  θdiff as diff,
  θshallowEqualObjects as shallowEqualObjects,
} from '@spartacus/core';

@Component({
  selector: 'cx-permissions-list',
  templateUrl: './permissions-list.component.html',
})
export class PermissionsListComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected permissionsService: PermissionService,
    protected cxDate: CxDatePipe
  ) {}

  permissionsList$: Observable<any>;
  private params$: Observable<PermissionSearchConfig>;

  protected defaultParams: PermissionSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

  ngOnInit(): void {
    this.params$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.queryParams));

    this.permissionsList$ = this.params$.pipe(
      map(params => ({
        ...this.defaultParams,
        ...params,
      })),
      distinctUntilChanged(shallowEqualObjects),
      map(this.normalizeParams),
      tap(params => this.permissionsService.loadPermissions(params)),
      switchMap(params =>
        this.permissionsService.getList(params).pipe(
          filter(Boolean),
          map((permissionsList: PermissionListModel) => ({
            sorts: permissionsList.sorts,
            pagination: permissionsList.pagination,
            permissionsList: permissionsList.permissions.map(permission => ({
              code: permission.code,
              name: permission.name,
              amount: `${permission.permission} ${permission.currency.symbol}`,
              startEndDate: `${this.cxDate.transform(
                permission.startDate
              )} - ${this.cxDate.transform(permission.endDate)}`,
              parentUnit: permission.orgUnit.name,
              orgUnitId: permission.orgUnit.uid,
            })),
          }))
        )
      )
    );
  }

  changeSortCode(sort: string): void {
    this.updateQueryParams({ sort });
  }

  pageChange(currentPage: number): void {
    this.updateQueryParams({ currentPage });
  }

  private updateQueryParams(newParams: Partial<PermissionSearchConfig>): void {
    this.params$
      .pipe(
        map(params => diff(this.defaultParams, { ...params, ...newParams })),
        take(1)
      )
      .subscribe((params: Partial<PermissionSearchConfig>) => {
        this.routingService.go(
          {
            cxRoute: 'permissions',
          },
          { ...params }
        );
      });
  }

  private normalizeParams({
    sort,
    currentPage,
    pageSize,
  }): PermissionSearchConfig {
    return {
      sort,
      currentPage: parseInt(currentPage, 10),
      pageSize: parseInt(pageSize, 10),
    };
  }
}
