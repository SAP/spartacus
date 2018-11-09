import { Component } from '@angular/core';

@Component({
  selector: 'cx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  tertiaryNavItems: any[] = [
    {
      label: 'Sale',
      url: '/sale'
    },
    {
      label: 'Contact us',
      url: '/contact'
    },
    {
      label: 'Help',
      url: '/help'
    }
  ];
  constructor() {}
}
