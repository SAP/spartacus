import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ROUTE_PARAMS } from '../../constants';

@Component({
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterDetailsComponent implements OnInit {
  model$: Observable<CostCenter>;
  costCenterRouteParam = ROUTE_PARAMS.costCenterCode;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  constructor(protected itemService: OrganizationItemService<CostCenter>) {}
}
