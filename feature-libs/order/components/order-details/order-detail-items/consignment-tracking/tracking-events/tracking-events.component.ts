/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CxDatePipe, TranslatePipe } from '@spartacus/core';
import { ConsignmentTracking, OrderHistoryFacade } from '@spartacus/order/root';
import {
  FocusConfig,
  FocusDirective,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-tracking-events',
  templateUrl: './tracking-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    NgIf,
    NgFor,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    CxDatePipe,
  ],
})
export class TrackingEventsComponent implements OnDestroy, OnInit {
  private subscription = new Subscription();
  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected orderHistoryFacade: OrderHistoryFacade,
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        if (data) {
          this.init(data.tracking$, data.shipDate);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.orderHistoryFacade.clearConsignmentTracking();
    this.subscription?.unsubscribe();
  }

  init(tracking$: Observable<ConsignmentTracking>, shipDate: Date) {
    this.tracking$ = tracking$;
    this.shipDate = shipDate;
  }

  close(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
