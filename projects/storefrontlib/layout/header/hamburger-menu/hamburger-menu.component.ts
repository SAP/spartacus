/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HamburgerMenuService } from './hamburger-menu.service';
import { I18nModule } from '@spartacus/core';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-hamburger-menu',
    templateUrl: './hamburger-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, I18nModule],
})
export class HamburgerMenuComponent {
  constructor(private hamburgerMenuService: HamburgerMenuService) {}

  toggle(): void {
    this.hamburgerMenuService.toggle();
  }

  get isExpanded(): Observable<boolean> {
    return this.hamburgerMenuService.isExpanded;
  }
}
