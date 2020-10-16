import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';

@Component({
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent {
  model$: Observable<UserGroup> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(protected itemService: OrganizationItemService<UserGroup>) {}
}
