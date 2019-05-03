import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
})
export class StorefrontComponent implements OnInit, OnDestroy {
  navigateSubscription: Subscription;
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;

  @HostBinding('class.is-navigating') isNavigating;

  constructor(
    private hamburgerMenuService: HamburgerMenuService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe(val => (this.isNavigating = !!val));
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
