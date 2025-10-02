/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { BudgetItemService } from '../services/budget-item.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FocusDirective } from '@spartacus/storefront';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleStatusComponent } from '../../shared/detail/toggle-status-action/toggle-status.component';
import { DisableInfoComponent } from '../../shared/detail/disable-info/disable-info.component';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';
import { CxDatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';
import { MockDatePipe } from '@spartacus/core';

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
    MockTranslatePipe,
    MockDatePipe,
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
