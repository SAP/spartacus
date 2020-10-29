import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { BudgetItemService } from '../services/budget-item.service';

@Component({
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: BudgetItemService,
    },
  ],
})
export class BudgetDetailsComponent implements OnInit {
  model$: Observable<Budget>;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true }),
      startWith({})
    );
  }

  constructor(protected itemService: OrganizationItemService<Budget>) {}
}
