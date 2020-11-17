import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { PermissionItemService } from '../services/permission-item.service';

@Component({
  selector: 'cx-org-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: PermissionItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class PermissionDetailsComponent {
  model$: Observable<Permission> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  constructor(protected itemService: ItemService<Permission>) {}
}
