import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CostCenterService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CostCenterFormComponentService } from '../cost-center-form/cost-center-form.component.service';

@Component({
  selector: 'cx-cost-center-create',
  templateUrl: './cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterCreateComponent {
  form: FormGroup;
  /**
   * The generated form key, used to restore the form value.
   */
  protected formKey: string;

  unitCode$: Observable<
    string | boolean
  > = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.queryParams?.['parentUnit']),
    tap((parentUnit) => this.initForm(parentUnit)),
    map((parentUnit) => parentUnit || true)
  );

  // TODO:#form-persistence - consolidate ctor
  constructor(
    protected costCenterService: CostCenterService,
    protected routingService: RoutingService,

    protected globalMessageService: GlobalMessageService,
    protected costCenterFormService: CostCenterFormComponentService
  ) {}

  protected initForm(parentUnitCode: string): void {
    // we don't want to re-init the form if we've already generated the key
    if (this.formKey) {
      return;
    }

    this.formKey = this.createFormKey(parentUnitCode);
    if (this.costCenterFormService.has(this.formKey)) {
      this.showFormRestoredMessage();
    }

    this.form = this.costCenterFormService.getForm(
      { unit: { uid: parentUnitCode } },
      this.formKey
    );
  }

  back(): void {
    this.removeForm();
  }

  protected createFormKey(unitCode?: string): string {
    return `cost-center-create-${unitCode}`;
  }

  protected showFormRestoredMessage(): void {
    this.globalMessageService.add(
      { key: 'form.restored' },
      GlobalMessageType.MSG_TYPE_INFO,
      5000
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
      const formValue = this.form.value;

      this.costCenterService.create(formValue);
      this.removeForm();

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: formValue,
      });
    }
  }
}
