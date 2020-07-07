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

  code$: Observable<string> = this.activatedRoute.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  costCenter$: Observable<CostCenter> = this.code$.pipe(
    tap((code) => this.costCenterService.load(code)),
    switchMap((code) => this.costCenterService.get(code)),
    tap((data) => this.form.patchValue(data))
  );

  constructor(
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService
  ) {}

  save(costCenterCode: string): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.form.disable();
      this.costCenterService.update(costCenterCode, this.form.value);

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: this.form.value,
      });
    }
  }
}
