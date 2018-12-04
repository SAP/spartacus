import { Component } from '@angular/core';
import { pageNotFoundImgSrc } from '../../images/pageNotFound';

@Component({
  selector: 'cx-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class PageNotFoundComponent {
  pageNotFoundImgSrc = pageNotFoundImgSrc;
  errorNav: { link: string; label: string }[] = [
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
