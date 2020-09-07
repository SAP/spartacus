import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnitNode, Currency, CurrencyService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { CurrentCostCenterService } from '../current-cost-center.service';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterFormComponent implements OnInit, OnDestroy {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  subscription = new Subscription();
  parentUnit$ = this.currentCostCenterService.b2bUnit$.pipe(filter(Boolean));

  constructor(
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService,
    protected currentCostCenterService: CurrentCostCenterService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
    this.subscription.add(
      this.parentUnit$.subscribe(() => {
        this.form.get('unit').disable();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
