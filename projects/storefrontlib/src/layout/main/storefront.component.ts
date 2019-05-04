import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HamburgerMenuService } from '../header/index';

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

  collapseMenu(): void {
    this.hamburgerMenuService.toggle(true);
  }
}
