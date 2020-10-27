import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistBudgetGuard } from '../guards/exist-budget.guard';

@Component({
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistBudgetGuard],
})
export class BudgetDetailsComponent implements AfterViewInit, OnDestroy {
  budgetGuardSubscription: Subscription;

  model$: Observable<Budget> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  ngAfterViewInit(): void {
    this.budgetGuardSubscription = this.existBudgetGuard
      .canActivate()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.budgetGuardSubscription.unsubscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<Budget>,
    protected existBudgetGuard: ExistBudgetGuard
  ) {}
}
