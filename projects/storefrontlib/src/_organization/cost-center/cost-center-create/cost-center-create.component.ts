import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CostCenterService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CostCenterFormComponentService } from '../cost-center-form/cost-center-form.component.service';

@Component({
  selector: 'cx-cost-center-create',
  templateUrl: './cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterCreateComponent {
  form: FormGroup;
  protected formKey: string;

  unitCode$: Observable<string> = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.queryParams?.['parentUnit']),
    first()
  );

  constructor(
    protected costCenterService: CostCenterService,
    protected routingService: RoutingService,

    protected globalMessageService: GlobalMessageService,
    protected costCenterFormService: CostCenterFormComponentService
  ) {}

  initForm(unitCode: string): FormGroup {
    this.formKey = this.createFormKey(unitCode);
    if (this.costCenterFormService.has(this.formKey)) {
      this.showFormRestoredMessage();
    }

    this.form = this.costCenterFormService.getForm(
      { unit: { uid: unitCode } },
      this.formKey
    );
    return this.form;
  }

  protected createFormKey(unitCode?: string): string {
    return `cost-center-create-${unitCode}`;
  }

  protected showFormRestoredMessage(): void {
    this.globalMessageService.add(
      { key: 'form.restored' },
      GlobalMessageType.MSG_TYPE_INFO
    );
  }

  protected removeForm(): void {
    this.form.reset();
    this.costCenterFormService.removeForm(this.formKey);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.form.disable();
      this.costCenterService.create(this.form.value);
      this.removeForm();

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: this.form.value,
      });
    }
  }
}
