/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FocusDirective } from '../../keyboard-focus/focus.directive';
import { SkipLink } from '../config/skip-link.config';
import { SkipLinkService } from '../service/skip-link.service';

@Component({
  selector: 'cx-skip-link',
  templateUrl: './skip-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, FocusDirective, NgFor, AsyncPipe, TranslatePipe],
})
export class SkipLinkComponent {
  skipLinks$: Observable<SkipLink[]> = this.skipLinkService.getSkipLinks();

  constructor(private skipLinkService: SkipLinkService) {}

  scrollToTarget(skipLink: SkipLink): void {
    this.skipLinkService.scrollToTarget(skipLink);
  }
}
