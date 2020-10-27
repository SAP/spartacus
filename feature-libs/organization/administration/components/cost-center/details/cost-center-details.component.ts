import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistCostCenterGuard } from '../guards';

@Component({
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistCostCenterGuard],
})
export class CostCenterDetailsComponent implements AfterViewInit, OnDestroy {
  costCenterGuardSubscription: Subscription;

  model$: Observable<CostCenter> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  ngAfterViewInit() {
    this.costCenterGuardSubscription = this.existCostCenterGuard
      .canActivate()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.costCenterGuardSubscription.unsubscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<CostCenter>,
    protected existCostCenterGuard: ExistCostCenterGuard
  ) {}
}
