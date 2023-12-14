/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  HostBinding,
} from '@angular/core';
import { CmsLinkComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-link',
  templateUrl: './link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnDestroy, OnInit {
  @HostBinding('class') styleClasses: string | undefined;

  data$: Observable<CmsLinkComponent> = this.component.data$;

  protected subscriptions: Subscription = new Subscription();

  constructor(protected component: CmsComponentData<CmsLinkComponent>) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.data$.subscribe((data) => {
        this.styleClasses = data?.styleClasses;
      })
    );
  }

  /**
   * Returns `_blank` to force opening the link in a new window whenever the
   * `data.target` flag is set to `true`.
   */
  getTarget(data: CmsLinkComponent): string | null {
    return data.target === 'true' || data.target === true ? '_blank' : null;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
