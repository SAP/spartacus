import { Component, HostBinding, OnInit } from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-page-template',
  templateUrl: './page-template.component.html'
})
export class PageTemplateComponent implements OnInit {
  // config, to be defined in a config or value provider
  templates = {
    LandingPage2Template: {
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5'
      ]
    },
    ProductDetailsPageTemplate: {
      slots: ['TopHeaderSlot', 'BottomHeaderSlot', 'PlaceholderContentSlot']
    },
    CartPageTemplate: {
      slots: ['BottomContentSlot']
    },
    ProductListPageTemplate: {
      slots: []
    },
    CategoryPageTemplate: {
      slots: ['Section4', 'Section1', 'Section2', 'Section3']
    },
    LoginPageTemplate: {
      slots: ['LeftContentSlot', 'RightContentSlot']
    }
  };

  @HostBinding('class') hostClass: string;

  constructor(private cms: CmsService) {}

  ngOnInit() {
    return this.cms
      .getCurrentPage()
      .pipe(map((page: Page) => page.template))
      .subscribe(templateName => (this.hostClass = templateName));
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage();
  }

  get templateName(): Observable<string> {
    return this.cms.getCurrentPage().pipe(map((page: Page) => page.template));
  }

  get slots(): Observable<string> {
    return this.templateName.pipe(
      map(templateName => {
        const template = this.templates[templateName];
        if (!template) {
          console.warn('no template found for', templateName);
          return;
        }
        return template.slots;
      })
    );
  }
}
