import { Component } from '@angular/core';
import { SeoTitleService } from '../../../seo';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent {
  constructor(private seoService: SeoTitleService) {
    this.seoService.initPageTitle();
  }
}
