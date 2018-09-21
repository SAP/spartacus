import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'y-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent implements OnInit {
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

  ngOnInit() {}
}
