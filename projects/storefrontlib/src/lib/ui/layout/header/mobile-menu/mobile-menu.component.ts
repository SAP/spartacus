import { ATHSPrompt } from '../../../../pwa/addToHomScreen';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'y-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnDestroy {
  private subscription: Subscription;
  showMenu = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.subscription = this.router.events.subscribe(() => {
        this.toggleMenu();
      });
    } else {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {}

  canAddToHomeScreen(): boolean {
    return ATHSPrompt.canPrompt;
  }
  addToHomeScreen(): void {
    ATHSPrompt.prompt();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
