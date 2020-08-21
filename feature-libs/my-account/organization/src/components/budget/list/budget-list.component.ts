import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { BaseOrganizationListService } from '../../shared/base-organization-list.service';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetListService, BudgetModel } from './budget-list.service';

const BASE_CLASS = 'organization';

export abstract class OrganizationListComponent<T, P = PaginationModel> {
  @HostBinding('class') hostClass = BASE_CLASS;

  abstract type: string;

  constructor(
    protected service: BaseOrganizationListService<T, P>,
    protected currentService: CurrentBudgetService
  ) {}

  readonly dataTable$: Observable<Table> = this.service.getTable();

  /**
   * The budget code for the selected budget. This is used to highlight the
   * active item in the list.
   */
  readonly currentKey$ = this.currentService.key$;

  // paginates the table
  readonly view = (p: P) => this.service.view(p);

  // sorts the table
  readonly sort = (p: P) => this.service.sort(p);
}

@Component({
  selector: 'cx-budget-list',
  templateUrl: '../../shared/templates/organization-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetListComponent extends OrganizationListComponent<
  BudgetModel
> {
  type: 'budget';

  constructor(
    protected currentBudgetService: CurrentBudgetService,
    protected budgetService: BudgetListService
  ) {
    super(budgetService, currentBudgetService);
  }
}
