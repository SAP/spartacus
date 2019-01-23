import { Component, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  private subscription: Subscription;

  @HostBinding('class.mobile-nav') showMenu = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.subscription = this.router.events.subscribe(() => {
        this.toggleMenu();
      });
    } else {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
