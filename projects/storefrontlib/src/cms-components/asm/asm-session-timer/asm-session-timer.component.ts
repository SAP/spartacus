import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-asm-session-timer',
  templateUrl: './asm-session-timer.component.html',
})
export class AsmSessionTimerComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private timerStartDelay = 600;
  private interval: any;
  timeLeft: number = this.timerStartDelay;

  constructor(
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.logout();
      }
      this.changeDetectorRef.markForCheck();
    }, 1000);

    this.subscriptions.add(
      this.routingService.isNavigating().subscribe(isNavigating => {
        console.log('isNavigating', isNavigating);
        if (isNavigating) {
          this.reset();
        }
      })
    );
  }

  reset() {
    if (this.timeLeft > 0) {
      this.timeLeft = this.timerStartDelay;
    }
    console.log('reset');
  }

  private logout(): void {
    this.authService.logout();
    this.authService.logoutCustomerSupportAgent();
    this.routingService.go({ cxRoute: 'home' });
    console.log('LOGOUT');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.interval) {
      console.log('interval cleared');
      clearInterval(this.interval);
    }
  }
}
