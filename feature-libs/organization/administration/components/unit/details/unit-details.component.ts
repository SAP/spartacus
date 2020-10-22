import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ROUTE_PARAMS } from '../../constants';

@Component({
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsComponent implements OnInit {
  model$: Observable<B2BUnit>;
  unitRouteParam = ROUTE_PARAMS.unitCode;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true }),
      startWith({})
    );
  }

  constructor(protected itemService: OrganizationItemService<B2BUnit>) {}
}
