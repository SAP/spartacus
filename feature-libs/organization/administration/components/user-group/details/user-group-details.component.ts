/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { UserGroupItemService } from '../services/user-group-item.service';
import { UrlModule, I18nModule } from '@spartacus/core';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { DeleteItemComponent } from '../../shared/detail/delete-item-action/delete-item.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardComponent } from '../../shared/card/card.component';
import { NgIf, AsyncPipe } from '@angular/common';

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
    standalone: true,
    imports: [
        NgIf,
        CardComponent,
        KeyboardFocusModule,
        RouterLink,
        DeleteItemComponent,
        ItemExistsDirective,
        RouterLinkActive,
        AsyncPipe,
        UrlModule,
        I18nModule,
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
