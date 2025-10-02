/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { PermissionItemService } from '../services/permission-item.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FocusDirective } from '@spartacus/storefront';
import { RouterLink } from '@angular/router';
import { ToggleStatusComponent } from '../../shared/detail/toggle-status-action/toggle-status.component';
import { DisableInfoComponent } from '../../shared/detail/disable-info/disable-info.component';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

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
  imports: [
    NgIf,
    CardComponent,
    FocusDirective,
    RouterLink,
    ToggleStatusComponent,
    DisableInfoComponent,
    ItemExistsDirective,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class PermissionDetailsComponent {
  model$: Observable<Permission> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;

  constructor(protected itemService: ItemService<Permission>) {}
}
