import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
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
    private routingService: RoutingService
  ) {
    // const source = of({ a: 1 });
    // const merged = merge(source, of({ b: 'merged' }));
    // const combined = combineLatest([source, of({ b: 'combined' })]);
    // const zipped = zip(source, of({ b: 'zipped' }));
    // merged.pipe(map(v => Object.assign({}, v))).subscribe(console.log);
    // combined.pipe(map(v => Object.assign({}, ...v))).subscribe(console.log);
    // zipped.pipe(map(v => Object.assign({}, ...v))).subscribe(console.log);
  }

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

  ngOnDestroy(): void {
    if (this.navigateSubscription) {
      this.navigateSubscription.unsubscribe();
    }
  }
}
