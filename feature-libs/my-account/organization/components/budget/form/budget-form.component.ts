import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnitNode, Currency, CurrencyService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetFormComponent implements OnInit {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  b2bUnits$: Observable<
    B2BUnitNode[]
  > = this.orgUnitService.getActiveUnitList();

  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
  }
}
