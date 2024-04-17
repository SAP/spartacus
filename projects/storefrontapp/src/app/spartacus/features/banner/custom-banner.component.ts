import { Component, ViewEncapsulation } from '@angular/core';
import { BannerComponent, CmsComponentData } from '@spartacus/storefront';
import {
  CmsBannerComponent,
  CmsService,
  SemanticPathService,
} from '@spartacus/core';

@Component({
  selector: 'custom-banner',
  template: `
    <h2>I am custom banner</h2>
    <cx-banner></cx-banner>
  `,
  styles: `.custom-class { background: red }`,
  encapsulation: ViewEncapsulation.None,
})
export class CustomBannerComponent extends BannerComponent {
  constructor(
    component: CmsComponentData<CmsBannerComponent>,
    urlService: SemanticPathService,
    cmsService: CmsService
  ) {
    super(component, urlService, cmsService);
    this.styleClasses = 'custom-class';
  }
}
