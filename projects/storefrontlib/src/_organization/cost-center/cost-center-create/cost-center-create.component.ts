import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
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
  /**
   * Used to show a notification banner to the user
   * about the form changes being restored.
   */
  protected formRestored = false;

  unitCode$: Observable<
    string | boolean
  > = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.queryParams?.['parentUnit']),
    tap((parentUnit) => this.initForm(parentUnit)),
    map((parentUnit) => parentUnit || true)
  );

  constructor(
    protected routingService: RoutingService,
    protected costCenterFormService: CostCenterFormComponentService
  ) {}

  protected initForm(parentUnitCode: string): void {
    // we don't want to re-init the form if we've already generated the key
    if (this.formKey) {
      return;
    }

    this.formKey = this.createFormKey();
    this.formRestored = this.costCenterFormService.hasForm(this.formKey);

    this.form = this.costCenterFormService.getForm(
      { unit: { uid: parentUnitCode } },
      this.formKey
    );
  }

  back(): void {
    this.removeForm();
  }

  /**
   * By default, the method delegates the call to `CostCenterFormComponentService.generateKey()`.
   * The key is used when restoring the form.
   */
  protected createFormKey(_data?: any): string {
    return this.costCenterFormService.generateKey();
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

      this.costCenterFormService.create(formValue);
      this.removeForm();

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: formValue,
      });
    }
  }
}
