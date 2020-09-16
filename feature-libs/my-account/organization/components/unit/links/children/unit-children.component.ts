import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UnitChildrenService } from './unit-children.service';

@Component({
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitChildrenService,
    },
  ],
})
export class UnitChildrenComponent {}
