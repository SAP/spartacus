import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CellComponent } from '../../shared';
import { BudgetItemService } from '../services/budget-item.service';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { Budget } from '../../../core/model/budget.model';

@Component({
  selector: 'cx-org-budget-details-cell',
  templateUrl: './budget-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsCellComponent extends CellComponent {
  model$: Observable<Budget>;

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: BudgetItemService
  ) {
    super(outlet);
  }

  openPopover() {
    this.model$ = this.itemService.load(this.model.code);
  }
}
