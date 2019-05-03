import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
})
export class StorefrontComponent {
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;
  isNavigating$: Observable<boolean> = this.routingService.isNavigating();

  constructor(
    private hamburgerMenuService: HamburgerMenuService,
    private routingService: RoutingService
  ) {}

  collapseMenu(): void {
    this.hamburgerMenuService.toggle(true);
  }
}
