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
    map((routingData) => ({
      url: routingData.state.url,
      parentUnit: routingData.state.queryParams?.['parentUnit'],
    })),
    tap(({ parentUnit, url }) => this.initForm(parentUnit, url)),
    map(({ parentUnit }) => parentUnit || true)
  );

  constructor(
    protected routingService: RoutingService,
    protected costCenterFormService: CostCenterFormComponentService
  ) {}

  protected initForm(parentUnitCode: string, url: string): void {
    // we don't want to re-init the form if we've already generated the key
    if (this.formKey) {
      return;
    }

    this.formKey = this.createFormKey() ?? url;
    this.formRestored = this.costCenterFormService.hasForm(this.formKey);

    this.form = this.costCenterFormService.getForm(
      { unit: { uid: parentUnitCode } },
      this.formKey
    );
  }

  back(): void {
    this.removeForm();
  }

  // TODO:#persistence - data?
  protected createFormKey(_data?: any): string | null {
    return null;
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
