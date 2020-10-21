import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ROUTE_PARAMS } from '../../constants';

@Component({
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent implements OnInit {
  model$: Observable<UserGroup>;
  userGroupRouteParam = ROUTE_PARAMS.userGroupCode;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  constructor(protected itemService: OrganizationItemService<UserGroup>) {}
}
