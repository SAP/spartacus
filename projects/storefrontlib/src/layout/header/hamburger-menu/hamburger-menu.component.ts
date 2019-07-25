import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HamburgerMenuService } from './hamburger-menu.service';

@Component({
  selector: 'cx-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuComponent {
  constructor(private hamburgerMenuService: HamburgerMenuService) {}

  toggle(): void {
    this.hamburgerMenuService.toggle();
  }

  get isExpanded(): Observable<boolean> {
    return this.hamburgerMenuService.isExpanded;
  }
}
