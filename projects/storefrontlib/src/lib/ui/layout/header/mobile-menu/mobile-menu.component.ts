import { Component, OnInit } from '@angular/core';
import { ATHSPrompt } from '../../../../pwa/addToHomScreen';

@Component({
  selector: 'y-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  public showMenu = false;
  constructor() {}

  ngOnInit() {}

  canAddToHomeScreen(): boolean {
    return ATHSPrompt.canPrompt;
  }
  addToHomeScreen(): void {
    ATHSPrompt.prompt();
  }
}
