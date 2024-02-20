/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsLinkComponent } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

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
