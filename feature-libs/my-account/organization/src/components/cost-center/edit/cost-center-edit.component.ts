import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CostCenter, CostCenterService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterEditComponent {
  form = new FormGroup({});

  /**
   * The code is used to update the cost center.
   */
  protected costCenterCode;

  protected code$: Observable<string> = this.router.parent.params.pipe(
    map((routingData) => routingData['code']),
    tap((code) => (this.costCenterCode = code))
  );

  costCenter$: Observable<CostCenter> = this.code$.pipe(
    tap((code) => this.costCenterService.loadCostCenter(code)),
    switchMap((code) => this.costCenterService.get(code)),
    tap((data) => this.form.patchValue(data))
  );

  constructor(
    // we can't do without the router as the routingService
    // is unable to resolve the parent routing params
    protected router: ActivatedRoute,
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService
  ) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.form.disable();
      this.costCenterService.update(this.costCenterCode, this.form.value);

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: this.form.value,
      });
    }
  }
}
