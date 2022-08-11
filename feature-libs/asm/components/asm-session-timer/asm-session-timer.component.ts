import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AsmConfig } from '@spartacus/asm/core';
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

  constructor(
    protected config: AsmConfig,
    protected asmComponentService: AsmComponentService,
    protected routingService: RoutingService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected userIdService: UserIdService
  ) {}

  ngOnInit(): void {
    this.timeLeft = this.getTimerStartDelayInSeconds();
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
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

  resetTimer(): void {
    if (this.timeLeft > 0) {
      this.timeLeft = this.getTimerStartDelayInSeconds();
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
