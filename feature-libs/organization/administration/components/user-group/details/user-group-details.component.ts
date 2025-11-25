/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { UserGroupItemService } from '../services/user-group-item.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FocusDirective } from '@spartacus/storefront';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DeleteItemComponent } from '../../shared/detail/delete-item-action/delete-item.component';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UserGroupItemService,
    },
  ],
  host: { class: 'content-wrapper' },
  imports: [
    NgIf,
    CardComponent,
    FocusDirective,
    RouterLink,
    DeleteItemComponent,
    ItemExistsDirective,
    RouterLinkActive,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class UserGroupDetailsComponent {
  model$: Observable<UserGroup> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;

  constructor(protected itemService: ItemService<UserGroup>) {}
}
