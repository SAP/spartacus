import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistCostCenterGuard } from '../guards';

@Component({
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistCostCenterGuard],
})
export class CostCenterDetailsComponent implements AfterViewInit {
  model$: Observable<CostCenter> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  ngAfterViewInit() {
    this.existCostCenterGuard.canActivate().subscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<CostCenter>,
    protected existCostCenterGuard: ExistCostCenterGuard
  ) {}
}
