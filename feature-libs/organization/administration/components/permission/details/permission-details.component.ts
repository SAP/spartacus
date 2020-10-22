import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ROUTE_PARAMS } from '../../constants';

@Component({
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetailsComponent implements OnInit {
  model$: Observable<Permission>;
  permissionRouteParam = ROUTE_PARAMS.permissionCode;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true }),
      startWith({})
    );
  }

  constructor(protected itemService: OrganizationItemService<Permission>) {}
}
