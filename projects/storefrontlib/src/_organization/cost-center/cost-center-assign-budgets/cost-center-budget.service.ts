import { Injectable } from '@angular/core';
import { B2BSearchConfig, CostCenterService } from '@spartacus/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableService } from '../../../_organization/shared/table/table.service';
import { CompanyTables } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetService {
  protected searchConfig$: BehaviorSubject<
    B2BSearchConfig
  > = new BehaviorSubject({});

  constructor(
    protected costCenterService: CostCenterService,
    protected tableService: TableService
  ) {}

  getDataTable(code: string) {
    return combineLatest([
      this.tableService.buildTableStructure(CompanyTables.COST_CENTER_BUDGETS),
      this.searchConfig$.pipe(
        switchMap((config) => this.costCenterService.getBudgets(code, config))
      ),
    ]).pipe(
      map(([structure, data]: [any, any]) => ({
        type: CompanyTables.COST_CENTER_BUDGETS,
        structure,
        data: data.values,
      }))
      // tmp
      // distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  search(config: B2BSearchConfig): void {
    const current = this.searchConfig$.value;
    this.searchConfig$.next({ ...current, ...config });
  }

  toggleAssign(costCenterCode: string, budgetCode: string, assign: boolean) {
    if (assign) {
      this.costCenterService.assignBudget(costCenterCode, budgetCode);
    } else {
      this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    }
  }
}
