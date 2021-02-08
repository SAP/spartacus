import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CostCenter, Currency, CurrencyService } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { ItemService } from '../../shared/item.service';
import { CostCenterItemService } from '../services/cost-center-item.service';
import { CurrentCostCenterService } from '../services/current-cost-center.service';
import { createCodeForEntityName } from '../../shared/utility/entity-code';

@Component({
  selector: 'cx-org-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: CostCenterItemService,
    },
    {
      provide: CurrentItemService,
      useExisting: CurrentCostCenterService,
    },
  ],
})
export class CostCenterFormComponent {
  form: FormGroup = this.itemService.getForm();
  /**
   * Initialize the business unit for the cost center.
   *
   * If there's a unit provided, we disable the form control.
   */
  @Input() set unitKey(value: string) {
    if (value) {
      this.form?.get('unit.uid').setValue(value);
      this.form?.get('unit')?.disable();
    }
  }

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList().pipe(
    tap((units) => {
      if (units.length === 1) {
        this.form?.get('unit.uid')?.setValue(units[0]?.id);
      }
    })
  );

  currencies$: Observable<Currency[]> = this.currencyService.getAll().pipe(
    tap((currency) => {
      if (currency.length === 1) {
        this.form?.get('currency.isocode')?.setValue(currency[0]?.isocode);
      }
    })
  );

  constructor(
    protected itemService: ItemService<CostCenter>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService
  ) {}

  createCodeWithName(name: AbstractControl, code: AbstractControl): void {
    createCodeForEntityName(name, code);
  }
}
