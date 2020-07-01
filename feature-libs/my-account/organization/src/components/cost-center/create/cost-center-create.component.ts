import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenterService, RoutingService } from '@spartacus/core';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center-create',
  templateUrl: './cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterCreateComponent implements OnInit {
  form = new FormGroup({});

  protected unitCode$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.queryParams?.['parentUnit']),
    first()
  );

  constructor(
    protected costCenterService: CostCenterService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.unitCode$.subscribe((unitCode) =>
      this.form.patchValue({ unit: { uid: unitCode } })
    );
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.form.disable();
      this.costCenterService.create(this.form.value);

      this.routingService.go({
        cxRoute: 'costCenterDetails',
        params: this.form.value,
      });
    }
  }
}
