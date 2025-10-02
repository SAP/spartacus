/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUser, B2BUserRole, B2BUserRight } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { UserItemService } from '../services/user-item.service';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FocusDirective } from '@spartacus/storefront';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleStatusComponent } from '../../shared/detail/toggle-status-action/toggle-status.component';
import { DisableInfoComponent } from '../../shared/detail/disable-info/disable-info.component';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UserItemService,
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
    NgFor,
    RouterLinkActive,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class UserDetailsComponent {
  userGuardSubscription: Subscription;
  model$: Observable<B2BUser> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;

  isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();

  availableRoles: string[] = this.b2bUserService
    .getAllRoles()
    .map((role: B2BUserRole) => role.toString());
  availableRights: string[] = this.b2bUserService
    .getAllRights()
    .map((right: B2BUserRight) => right.toString());

  constructor(
    protected itemService: ItemService<B2BUser>,
    protected b2bUserService: B2BUserService
  ) {}

  hasRight(model: B2BUser): boolean {
    return (model.roles ?? []).some((role: string) =>
      this.availableRights.includes(role)
    );
  }
}
