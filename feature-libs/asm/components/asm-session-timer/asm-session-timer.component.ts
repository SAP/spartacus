/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AsmConfig } from '@spartacus/asm/root';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-asm-session-timer',
  templateUrl: './asm-session-timer.component.html',
})
export class AsmSessionTimerComponent implements OnInit, OnDestroy {
  protected subscriptions = new Subscription();
  protected interval: any;
  protected maxStartDelayInSeconds = 60000;
  timeLeft: number;
  expiredTime: number;

  constructor(
    protected config: AsmConfig,
    protected asmComponentService: AsmComponentService,
    protected routingService: RoutingService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected userIdService: UserIdService
  ) {}

  ngOnInit(): void {
    this.initTimer();
    this.interval = setInterval(() => {
      const currentSeconds = new Date().getTime() / 1000;
      this.timeLeft = Math.floor(this.expiredTime - currentSeconds);
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
      }
      this.changeDetectorRef.markForCheck();
    }, 1000);

    this.resetOnNavigate();
    this.resetOnCustomerSessionChange();
  }

  protected resetOnNavigate(): void {
    this.subscriptions.add(
      this.routingService.isNavigating().subscribe((isNavigating) => {
        if (isNavigating) {
          this.resetTimer();
        }
      })
    );
  }

  protected resetOnCustomerSessionChange(): void {
    this.subscriptions.add(
      this.userIdService
        .getUserId()
        .pipe(distinctUntilChanged())
        .subscribe(() => this.resetTimer())
    );
  }

  protected initTimer(): void {
    const timeoutPropertyInSeconds = this.getTimerStartDelayInSeconds();
    const currentSeconds = new Date().getTime() / 1000;
    this.timeLeft = timeoutPropertyInSeconds;
    this.expiredTime = currentSeconds + this.timeLeft;
  }

  resetTimer(): void {
    if (this.timeLeft > 0) {
      this.initTimer();
    }
  }

  protected getTimerStartDelayInSeconds(): number {
    if (
      this.config.asm?.agentSessionTimer?.startingDelayInSeconds === undefined
    ) {
      return 600;
    }
    if (
      this.config.asm.agentSessionTimer.startingDelayInSeconds >
      this.maxStartDelayInSeconds
    ) {
      return this.maxStartDelayInSeconds;
    } else {
      return this.config.asm.agentSessionTimer.startingDelayInSeconds;
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
