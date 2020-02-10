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
  CostCenterService,
  RoutingService,
  CxDatePipe,
  EntitiesModel,
  B2BSearchConfig,
  θdiff as diff,
  θshallowEqualObjects as shallowEqualObjects,
  CostCenter,
} from '@spartacus/core';

@Component({
  selector: 'cx-costCenter-list',
  templateUrl: './cost-center-list.component.html',
})
export class CostCenterListComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected costCentersService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {}

  costCentersList$: Observable<any>;
  private params$: Observable<B2BSearchConfig>;

  protected defaultParams: B2BSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

  ngOnInit(): void {
    this.params$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.queryParams));

    this.costCentersList$ = this.params$.pipe(
      map(params => ({
        ...this.defaultParams,
        ...params,
      })),
      distinctUntilChanged(shallowEqualObjects),
      map(this.normalizeParams),
      tap(params => this.costCentersService.loadCostCenters(params)),
      switchMap(params =>
        this.costCentersService.getList(params).pipe(
          filter(Boolean),
          map((costCentersList: EntitiesModel<CostCenter>) => ({
            sorts: costCentersList.sorts,
            pagination: costCentersList.pagination,
            costCentersList: costCentersList.values.map(costCenter => ({
              ...costCenter,
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

  private updateQueryParams(newParams: Partial<B2BSearchConfig>): void {
    this.params$
      .pipe(
        map(params => diff(this.defaultParams, { ...params, ...newParams })),
        take(1)
      )
      .subscribe((params: Partial<B2BSearchConfig>) => {
        this.routingService.go(
          {
            cxRoute: 'costCenters',
          },
          { ...params }
        );
      });
  }

  private normalizeParams({ sort, currentPage, pageSize }): B2BSearchConfig {
    return {
      sort,
      currentPage: parseInt(currentPage, 10),
      pageSize: parseInt(pageSize, 10),
    };
  }
}
