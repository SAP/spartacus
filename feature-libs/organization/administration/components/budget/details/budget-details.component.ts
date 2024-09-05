/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { BudgetItemService } from '../services/budget-item.service';
import { UrlModule, I18nModule } from '@spartacus/core';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { DisableInfoComponent } from '../../shared/detail/disable-info/disable-info.component';
import { ToggleStatusComponent } from '../../shared/detail/toggle-status-action/toggle-status.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardComponent } from '../../shared/card/card.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-org-budget-details',
    templateUrl: './budget-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: ItemService,
            useExisting: BudgetItemService,
        },
    ],
    host: { class: 'content-wrapper' },
    standalone: true,
    imports: [
        NgIf,
        CardComponent,
        KeyboardFocusModule,
        RouterLink,
        ToggleStatusComponent,
        DisableInfoComponent,
        ItemExistsDirective,
        RouterLinkActive,
        AsyncPipe,
        UrlModule,
        I18nModule,
    ],
})
export class BudgetDetailsComponent implements OnInit {
  model$: Observable<Budget>;
  isInEditMode$ = this.itemService.isInEditMode$;

  ngOnInit() {
    this.model$ = this.itemService.key$.pipe(
      switchMap((code) => this.itemService.load(code)),
      startWith({})
    );
  }

  constructor(protected itemService: ItemService<Budget>) {}
}
