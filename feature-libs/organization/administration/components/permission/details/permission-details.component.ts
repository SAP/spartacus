/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
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
  standalone: false,
})
export class PermissionDetailsComponent {
  protected itemService = inject<ItemService<Permission>>(ItemService);

  model$: Observable<Permission> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;
}
