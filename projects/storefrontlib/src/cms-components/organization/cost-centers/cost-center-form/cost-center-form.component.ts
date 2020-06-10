import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { B2BUnitNode, CostCenter, Currency } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
import { CostCenterFormComponentService } from './cost-center-form.component.service';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterFormComponent extends AbstractFormComponent
  implements OnInit {
  businessUnits$: Observable<
    B2BUnitNode[]
  > = this.formService.getBusinessUnits();
  currencies$: Observable<Currency[]> = this.formService.getCurrencies();

  @Input()
  costCenterData: CostCenter;

  @Input()
  readonlyParent = false;

  // TODO:#persist-forms - pass it in the template
  @Input()
  formKey: string;

  constructor(protected formService: CostCenterFormComponentService) {
    super();
  }

  ngOnInit() {
    this.formService.loadOrgUnitNodes();
    this.form = this.formService.getForm(this.formKey, this.costCenterData);
  }

  verifyAndSubmit(): void {
    console.log('submit');
    this.submitClicked = true;
    if (this.form.valid) {
      this.form.reset();
      this.formService.removeForm(this.formKey);
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  back(): void {
    console.log('back');
    this.form.reset();
    this.formService.removeForm(this.formKey);
    this.clickBack.emit();
  }
}
