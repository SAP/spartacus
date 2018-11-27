import { Component } from '@angular/core';
import { pageNotFoundImgSrc } from '../../images/pageNotFound';

@Component({
  selector: 'cx-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class PageNotFoundComponent {
  pageNotFoundImgSrc = pageNotFoundImgSrc;
  errorNav: { label: string; routeName: string[] }[] = [
    {
      label: 'Homepage',
      routeName: ['homepage']
    },
    {
      label: 'Frequently Asked Question',
      routeName: ['help']
    },
    {
      label: 'Cart',
      routeName: ['cart']
    }
  ];
}
