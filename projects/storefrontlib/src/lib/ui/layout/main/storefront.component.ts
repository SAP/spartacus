import { Component } from '@angular/core';
import { HamburgerMenuService } from 'projects/storefrontlib/src/layout/header/hamburger-menu/hamburger-menu.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss'],
})
export class StorefrontComponent {
  constructor(private hamburgerMenuService: HamburgerMenuService) {}

  get isExpanded(): Observable<boolean> {
    return this.hamburgerMenuService.isExpanded;
  }
}
