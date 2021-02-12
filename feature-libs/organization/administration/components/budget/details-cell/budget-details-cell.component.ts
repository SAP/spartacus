import {
  Component,
  ChangeDetectionStrategy,
  // OnInit
} from '@angular/core';
// import { Observable } from 'rxjs';
import {
  CellComponent,
  // , ItemService
} from '../../shared';
// import {
//   OutletContextData,
//   TableDataOutletContext,
// } from '@spartacus/storefront';
// import { Budget } from '../../../core/model/budget.model';

@Component({
  selector: 'cx-org-budget-details-cell',
  templateUrl: './budget-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsCellComponent extends CellComponent {
  // implements OnInit {
  // model$: Observable<Budget>;
  //
  // constructor(
  //   protected outlet: OutletContextData<TableDataOutletContext>,
  //   protected itemService: ItemService<Budget>
  // ) {
  //   super(outlet);
  // }
  // ngOnInit() {
  //   this.model$ = this.itemService.load(this.model.code);
  // }
}
