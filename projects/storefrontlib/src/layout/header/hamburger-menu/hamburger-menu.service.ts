import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HamburgerMenuService {
  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(router: Router) {
    router.events.subscribe(() => {
      this.toggle(true);
    });
  }

  /**
   * toggles the expand state of the hamburger menu
   */
  toggle(forceCollapse?: boolean): void {
    if (forceCollapse) {
      this.isExpanded.next(false);
    } else {
      this.isExpanded.next(!this.isExpanded.value);
    }
  }
}
