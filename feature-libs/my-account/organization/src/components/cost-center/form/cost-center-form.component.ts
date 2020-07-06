import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  OrgUnitService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CostCenterFormService } from './cost-center-form.service';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterFormComponent implements OnInit {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  /**
   * The unitUid can be given to steer the initial value for the form control.
   */
  @Input() unitUid: string;

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected costCenterFormService: CostCenterFormService,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit() {
    this.costCenterFormService.build(this.form);

    if (this.unitUid) {
      this.form.patchValue({ unit: { uid: this.unitUid } });
    }
  }
}
