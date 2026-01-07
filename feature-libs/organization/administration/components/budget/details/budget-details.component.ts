/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CxDatePipe, TranslatePipe, UrlPipe } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { FocusDirective } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CardComponent } from '../../shared/card/card.component';
import { DisableInfoComponent } from '../../shared/detail/disable-info/disable-info.component';
import { ToggleStatusComponent } from '../../shared/detail/toggle-status-action/toggle-status.component';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { ItemService } from '../../shared/item.service';
import { BudgetItemService } from '../services/budget-item.service';

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
  imports: [
    NgIf,
    CardComponent,
    FocusDirective,
    RouterLink,
    ToggleStatusComponent,
    DisableInfoComponent,
    ItemExistsDirective,
    RouterLinkActive,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    CxDatePipe,
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
