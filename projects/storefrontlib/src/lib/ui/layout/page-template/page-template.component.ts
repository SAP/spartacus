import { Component, HostBinding, OnInit } from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

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
    ContentPage1Template: {
      slots: ['Section2A', 'Section2B']
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
    },
    AccountPageTemplate: {
      slots: ['BodyContent', 'SideContent']
    },
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent']
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['SideContent']
    }
  };

  @HostBinding('class') hostClass: string;

  constructor(private cms: CmsService) {}

  ngOnInit() {
    return this.templateName
      .pipe(take(1))
      .subscribe(templateName => (this.hostClass = templateName));
  }

  get page$(): Observable<Page> {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  get templateName(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.template));
  }

  get slots(): Observable<any> {
    return this.page$.pipe(
      map((page: Page) => {
        if (!page) {
          return;
        }
        if (
          this.templates[page.template] &&
          this.templates[page.template].slots
        ) {
          // console.warn('Template found for', page.template);
          // console.log('The content provides the following slots', page.slots);
          return this.templates[page.template].slots;
        } else {
          console.warn('no template found for', page.template);
          console.log('The content provides the following slots', page.slots);
        }
      })
    );
  }
}
