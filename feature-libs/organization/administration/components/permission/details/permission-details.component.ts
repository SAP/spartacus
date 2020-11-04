import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';

@Component({
  selector: 'cx-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
})
export class PermissionDetailsComponent {
  model$: Observable<Permission> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(protected itemService: OrganizationItemService<Permission>) {}
}
