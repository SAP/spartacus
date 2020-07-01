import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  OrgUnitService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
})
export class CostCenterFormComponent implements OnInit {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.orgUnitService.loadOrgUnitNodes();
  }

  protected buildForm() {
    if (!this.form) {
      this.form = new FormGroup({});
    }
    this.form.setControl('code', new FormControl('', Validators.required));
    this.form.setControl('name', new FormControl('', Validators.required));

    this.form.setControl(
      'currency',
      new FormGroup({
        isocode: new FormControl(undefined, Validators.required),
      })
    );
    this.form.setControl(
      'unit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
  }
}
