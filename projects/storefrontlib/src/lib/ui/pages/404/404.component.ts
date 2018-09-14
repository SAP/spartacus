import { Component } from '@angular/core';

@Component({
  selector: 'y-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class PageNotFoundComponent {
  errorNav = [
    {
      link: '/',
      label: 'Homepage'
    },
    {
      link: '/faq',
      label: 'Frequently Asked Question'
    },
    {
      link: '/cart',
      label: 'Cart'
    }
  ];
}
