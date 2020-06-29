import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CostCenter, CostCenterService, RoutingService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterDetailsComponent implements OnInit {
  costCenter$: Observable<CostCenter>;
  code$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected costCentersService: CostCenterService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.costCenter$ = this.code$.pipe(
      tap((code) => this.costCentersService.loadCostCenter(code)),
      switchMap((code) => this.costCentersService.get(code)),
      filter(Boolean)
    );
  }

  update(costCenter: CostCenter) {
    this.code$
      .pipe(take(1))
      .subscribe((costCenterCode) =>
        this.costCentersService.update(costCenterCode, costCenter)
      );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
