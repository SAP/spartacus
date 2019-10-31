import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-asm-session-timer',
  templateUrl: './asm-session-timer.component.html',
})
export class AsmSessionTimerComponent implements OnInit {
  timerStartDelay = 600;
  timeLeft: number = this.timerStartDelay;
  interval: any;

  constructor(
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log('timeleft', this.timeLeft);
      } else {
        clearInterval(this.interval);
        this.logout();
      }
      this.changeDetectorRef.markForCheck();
    }, 1000);
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
}
