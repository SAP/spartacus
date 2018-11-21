import { Component } from '@angular/core';

@Component({
  selector: 'cx-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent {
  constructor() {}

  tertiaryNavItems: { label: string; pageName: string[] }[] = [
    {
      label: 'Sale',
      pageName: ['sale']
    },
    {
      label: 'Contact us',
      pageName: ['contact']
    },
    {
      label: 'Help',
      pageName: ['help']
    }
  ];
}
