import { Component } from '@angular/core';
import { pageNotFoundImgSrc } from '../../images/pageNotFound';

@Component({
  selector: 'cx-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class PageNotFoundComponent {
  pageNotFoundImgSrc = pageNotFoundImgSrc;
  errorNav: { label: string; pageName: string }[] = [
    {
      label: 'Homepage',
      pageName: 'homepage'
    },
    {
      label: 'Frequently Asked Question',
      pageName: 'help'
    },
    {
      label: 'Cart',
      pageName: 'cart'
    }
  ];
}
