import { Injectable } from '@angular/core';
import {
  B2BSearchConfig,
  CostCenter,
  CostCenterService as c,
  EntitiesModel,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  Table,
  TableStructure,
} from '../../../_organization/shared/table/table.model';
import { TableService } from '../../../_organization/shared/table/table.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterService {
  searchConfig$: BehaviorSubject<B2BSearchConfig> = new BehaviorSubject({
    // currentPage: 0,
    pageSize: 30,
    sort: 'byUnit',
  });

  constructor(
    protected costCentersService: c,
    protected tableService: TableService
  ) {}

  search(config: B2BSearchConfig): void {
    const current = this.searchConfig$.value;
    this.searchConfig$.next({ ...current, ...config });
  }

  getDataTable(): Observable<Table> {
    return combineLatest([
      this.tableService.getTableStructure('costCenterList'),
      this.getCostCenters(),
    ]).pipe(
      map(([structure, costCenters]: [any, any]) =>
        this.populateCostCenterTable(structure, costCenters)
      )
    );
  }

  // TODO: move to generic conversion
  protected populateCostCenterTable(
    structure: TableStructure,
    costCenters: EntitiesModel<CostCenter>
  ): Table {
    const data = Array.from(costCenters.values).map((value: any) => ({
      ...value,
      currency: value.currency?.isocode,
      active: value.active === true || value.active === 'true',
    }));

    return {
      type: 'costCentersList',
      structure,
      data,
      sorts: costCenters.sorts,
      pagination: costCenters.pagination,
    } as Table;
  }

  protected getCostCenters(): Observable<EntitiesModel<CostCenter>> {
    return this.searchConfig$.pipe(
      switchMap((config) => this.costCentersService.getList(config))
    );
  }

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
