import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AsmConfig, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { AsmComponentService } from '../asm-component.service';

@Component({
  selector: 'cx-asm-session-timer',
  templateUrl: './asm-session-timer.component.html',
})
export class AsmSessionTimerComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private interval: any;
  private maxStartDelayInSeconds = 60000;
  timeLeft: number;

  constructor(
    private config: AsmConfig,
    private asmComponentService: AsmComponentService,
    private routingService: RoutingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
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

    this.subscriptions.add(
      this.routingService.isNavigating().subscribe(isNavigating => {
        if (isNavigating) {
          this.resetTimer();
        }
      })
    );
  }

  resetTimer() {
    if (this.timeLeft > 0) {
      this.timeLeft = this.getTimerStartDelayInSeconds();
    }
  }

  private getTimerStartDelayInSeconds(): number {
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
