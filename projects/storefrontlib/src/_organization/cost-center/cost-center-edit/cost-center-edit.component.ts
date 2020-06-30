import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CostCenter,
  CostCenterService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CostCenterFormComponentService } from '../cost-center-form/cost-center-form.component.service';

@Component({
  selector: 'cx-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterEditComponent {
  form: FormGroup;
  /**
   * The generated form key, used to restore the form value.
   */
  protected formKey: string;
  /**
   * The code is used to update the cost center.
   */
  protected costCenterCode: string;

  protected code$: Observable<string> = this.router.parent.params.pipe(
    map((routingData) => routingData['code']),
    tap((code) => (this.costCenterCode = code))
  );

  costCenter$: Observable<CostCenter> = this.code$.pipe(
    tap((code) => this.costCenterService.loadCostCenter(code)),
    switchMap((code) => this.costCenterService.get(code)),
    tap((costCenter) => this.initForm(costCenter))
  );

  // TODO:#form-persistence - consolidate ctor
  constructor(
    // we can't do without the router as the routingService
    // is unable to resolve the parent routing params
    protected router: ActivatedRoute,
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,

    protected globalMessageService: GlobalMessageService,
    protected costCenterFormService: CostCenterFormComponentService
  ) {}

  protected initForm(costCenter: CostCenter): void {
    // we don't want to re-init the form if we've already generated the key
    if (this.formKey) {
      return;
    }

    this.formKey = this.createFormKey(costCenter);
    if (this.costCenterFormService.has(this.formKey)) {
      this.showFormRestoredMessage();
    }

    this.form = this.costCenterFormService.getForm(costCenter, this.formKey);
  }

  back(): void {
    this.removeForm();
  }

  protected createFormKey(costCenter: CostCenter): string {
    return `cost-center-edit-${costCenter.code}-${costCenter.unit?.uid}`;
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

      this.costCenterService.update(this.costCenterCode, formValue);
      this.removeForm();

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: formValue,
      });
    }
  }
}
