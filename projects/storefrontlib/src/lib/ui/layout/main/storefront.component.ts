import { Component } from '@angular/core';
import { SeoTitleService } from '../../../seo/seo-title.service';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent {
  constructor(protected seoService: SeoTitleService) {
    this.seoService.initPageTitle();
  }
}
