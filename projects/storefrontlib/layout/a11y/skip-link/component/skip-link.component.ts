/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SkipLink } from '../config/skip-link.config';
import { SkipLinkService } from '../service/skip-link.service';

@Component({
  selector: 'cx-skip-link',
  templateUrl: './skip-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SkipLinkComponent {
  private skipLinkService = inject(SkipLinkService);

  skipLinks$: Observable<SkipLink[]> = this.skipLinkService.getSkipLinks();

  scrollToTarget(skipLink: SkipLink): void {
    this.skipLinkService.scrollToTarget(skipLink);
  }
}
