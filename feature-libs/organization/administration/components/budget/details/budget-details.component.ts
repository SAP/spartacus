import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
} from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistBudgetGuard } from '../guards/exist-budget.guard';

@Component({
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistBudgetGuard],
})
export class BudgetDetailsComponent implements AfterViewInit {
  model$: Observable<Budget> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  ngAfterViewInit() {
    this.existBudgetGuard.canActivate().subscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<Budget>,
    protected existBudgetGuard: ExistBudgetGuard
  ) {}
}
