import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../shared';
import { UserPermissionListService } from './user-permission-list.service';

@Component({
  templateUrl: './user-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserPermissionListService,
    },
  ],
})
export class UserPermissionListComponent {}
