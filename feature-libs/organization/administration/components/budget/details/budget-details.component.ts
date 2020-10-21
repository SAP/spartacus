import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ROUTE_PARAMS } from '../../constants';

@Component({
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent implements OnInit {
  model$: Observable<Budget>;
  budgetRouteParam = ROUTE_PARAMS.budgetCode;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  constructor(protected itemService: OrganizationItemService<Budget>) {}
}
