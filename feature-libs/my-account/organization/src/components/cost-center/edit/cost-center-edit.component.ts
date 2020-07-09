import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CostCenterFormService } from '../form/cost-center-form.service';

@Component({
  selector: 'cx-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterEditComponent {
  costCenterCode: string;
  costCenter: CostCenter;

  protected code$: Observable<string> = this.activatedRoute.parent.params.pipe(
    map((routingData) => routingData['code']),
    tap((code) => (this.costCenterCode = code))
  );

  protected costCenter$: Observable<CostCenter> = this.code$.pipe(
    tap((code) => this.costCenterService.load(code)),
    switchMap((code) => this.costCenterService.get(code)),
    tap((costCenter) => (this.costCenter = costCenter))
  );

  form$: Observable<FormGroup> = this.costCenter$.pipe(
    map((costCenter) => this.costCenterFormService.getForm(costCenter))
  );

  constructor(
    protected costCenterService: CostCenterService,
    protected costCenterFormService: CostCenterFormService,
    protected activatedRoute: ActivatedRoute,
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected routingService: RoutingService
  ) {}

  save(costCenterCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
    } else {
      form.disable();
      this.costCenterService.update(costCenterCode, form.value);

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: form.value,
      });
    }
  }
}
