import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
})
export class StorefrontComponent implements OnInit, OnDestroy {
  navigateSubscription: Subscription;
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;

  @HostBinding('class.start-navigating') startNavigating;
  @HostBinding('class.stop-navigating') stopNavigating;

  constructor(
    private hamburgerMenuService: HamburgerMenuService,
    private routingService: RoutingService,
    private _router: Router
  ) {
    (window as any).router = this._router;
  }

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe(val => {
        this.startNavigating = val === true;
        this.stopNavigating = val === false;
      });
  }

  collapseMenu(): void {
    this.hamburgerMenuService.toggle(true);
  }

  ngOnDestroy(): void {
    if (this.navigateSubscription) {
      this.navigateSubscription.unsubscribe();
    }
  }
}
