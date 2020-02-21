import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  BaseSiteService,
  CurrencyService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';

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
    private baseSiteService: BaseSiteService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe(val => {
        this.startNavigating = val === true;
        this.stopNavigating = val === false;
      });
  }

  collapseMenuIfClickOutside(event: MouseEvent) {
    if ((<HTMLElement>event.target).className.includes('is-expanded')) {
      this.collapseMenu();
    }
  }

  collapseMenu(): void {
    this.hamburgerMenuService.toggle(true);
  }

  goToApparel(): void {
    this.baseSiteService.setActive('apparel-uk-spa');
    this.currencyService.setActive('GBP');
    // this.winRef.nativeWindow.history.pushState(
    //   {},
    //   'test',
    //   '/apparel-uk-spa/en/GBP/'
    // );
    // this.routingService.go('/apparel-uk-spa/eb/GBP');
  }

  goToElectronics(): void {
    this.baseSiteService.setActive('electronics-spa');
    this.currencyService.setActive('USD');
  }

  ngOnDestroy(): void {
    if (this.navigateSubscription) {
      this.navigateSubscription.unsubscribe();
    }
  }
}
