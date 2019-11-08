import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AsmConfig,
  AuthService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  RoutingService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { AsmComponentService } from '../services/asm-component.service';

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
    private authService: AuthService,
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

    this.resetOnNavigate();
    this.resetOnCustomerEmulationStart();
  }

  private resetOnNavigate() {
    this.subscriptions.add(
      this.routingService.isNavigating().subscribe(isNavigating => {
        if (isNavigating) {
          this.resetTimer();
        }
      })
    );
  }

  private resetOnCustomerEmulationStart() {
    this.subscriptions.add(
      this.authService
        .getOccUserId()
        .pipe(pairwise())
        .subscribe(userIds => {
          if (this.isCustomerEmulationStart(userIds[0], userIds[1])) {
            this.resetTimer();
          }
        })
    );
  }

  private isCustomerEmulationStart(
    previousUserId: string,
    newUserId: string
  ): boolean {
    return (
      previousUserId === OCC_USER_ID_ANONYMOUS &&
      (newUserId !== OCC_USER_ID_ANONYMOUS && newUserId !== OCC_USER_ID_CURRENT)
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
