import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HamburgerMenuService {
  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * toggles the expand state of the hamburger menu
   */
  toggle(): void {
    this.isExpanded.next(this.isExpanded.value !== true);
  }
}
