import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
import { CostCenterFormComponentService } from './cost-center-form.component.service';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterFormComponent extends AbstractFormComponent
  implements OnInit {
  @Input()
  costCenterData: CostCenter;

  @Input()
  readonlyParent = false;

  constructor(protected formService: CostCenterFormComponentService) {
    super();
  }

  ngOnInit() {
    this.form = this.formService.getForm(this.costCenterData, this.formKey);
  }

  protected removeForm(): void {
    this.form.reset();
    this.formService.removeForm(this.formKey);
  }
}
