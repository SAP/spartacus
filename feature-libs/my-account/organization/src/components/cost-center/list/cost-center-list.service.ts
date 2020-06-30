import { Injectable } from '@angular/core';
import {
  B2BSearchConfig,
  CostCenter,
  EntitiesModel,
  CostCenterService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { OrganizationTables } from '../../shared/organization.model';
import { TableService, Table, TableStructure } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class CostCenterListService {
  protected searchConfig$: BehaviorSubject<
    B2BSearchConfig
  > = new BehaviorSubject({
    pageSize: 10,
  });

  // protected costCenterList$: Observable<EntitiesModel<CostCenter>> = this.searchConfig$.pipe(
  //   switchMap((config) => this.costCentersService.getList(config))
  // );

  protected dataset$ = combineLatest([
    this.tableService.buildStructure(OrganizationTables.COST_CENTER),
    this.searchConfig$.pipe(
      switchMap((config) => this.costCentersService.getList(config))
    ),
  ]).pipe(
    map(([structure, costCenters]: [any, any]) =>
      this.populateCostCenterTable(structure, costCenters)
    ),
    // tmp
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );

  constructor(
    protected costCentersService: CostCenterService,
    protected tableService: TableService
  ) {}

  search(config: B2BSearchConfig): void {
    const current = this.searchConfig$.value;
    this.searchConfig$.next({ ...current, ...config });
  }

  getDataTable(): Observable<Table> {
    return this.dataset$;
  }

  // TODO: move to generic conversion
  protected populateCostCenterTable(
    structure: TableStructure,
    costCenters: EntitiesModel<CostCenter>
  ): Table {
    // console.log(costCenters);
    const data = Array.from(costCenters.values).map((value: any) => ({
      ...value,
      currency: value.currency?.isocode,
      active: value.active,
    }));

    return {
      structure,
      data$: of(data),
      pagination: costCenters.pagination,
      // type: 'costCenter',
      // structure,
      // data,
      // sorts: costCenters.sorts,
      // pagination: costCenters.pagination,
    } as Table;
  }

  // protected getCostCenters(): Observable<EntitiesModel<CostCenter>> {
  //   return this.searchConfig$.pipe(
  //     switchMap((config) => this.costCentersService.getList(config))
  //   );
  // }

  // protected getSearchConfig(): Observable<B2BSearchConfig> {
  //   return of({
  //     // currentPage: 0,
  //     pageSize: 10,
  //     sort: 'byUnit',
  //   });
  // }

  // this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
  //   tap((params) => this.costCentersService.loadCostCenters(params)),
  //   switchMap((params) =>
  //     this.costCentersService.getList(params).pipe(
  //       filter(Boolean),
  //       map((costCentersList: EntitiesModel<CostCenter>) => ({
  //         sorts: costCentersList.sorts,
  //         pagination: costCentersList.pagination,
  //         values: costCentersList.values.map((costCenter) => ({
  //           code: costCenter.code,
  //           name: costCenter.name,
  //           currency: costCenter.currency && costCenter.currency.isocode,
  //           parentUnit: costCenter.unit && costCenter.unit.name,
  //           uid: costCenter.unit && costCenter.unit.uid,
  //         })),
  //       }))
  //     )
  //   )
  // );
}
