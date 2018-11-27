import { Component } from '@angular/core';

@Component({
  selector: 'cx-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent {
  constructor() {}

  tertiaryNavItems: { label: string; routeName: string[] }[] = [
    {
      label: 'Sale',
      routeName: ['sale']
    },
    {
      label: 'Contact us',
      routeName: ['contact']
    },
    {
      label: 'Help',
      routeName: ['help']
    }
  ];
}
