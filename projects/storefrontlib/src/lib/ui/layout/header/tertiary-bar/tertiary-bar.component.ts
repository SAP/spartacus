import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent implements OnInit {
  tertiaryNavItems: { label: string; url: string }[] = [
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
